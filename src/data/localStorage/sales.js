import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";
import { getDetailsByTicket, getDetailsByTickets } from "./details";
import { getSeller, getSellers } from "./sellers";
import { getCurrentSchedule, getSchedules, getShiftSchedule } from "./shiftSchedules";
import { getWinners, summaryWins } from "./winners";

export async function getLastId() {
    await fakeNetwork();
    let sales = await localforage.getItem("tickets");

    return sales ? sales.length : 0;
}

export async function getTickets(idSchedule, idSeller, query, p) {
    await fakeNetwork(`getTickets:${idSchedule},${idSeller}`);
    let tickets = await localforage.getItem("tickets");

    if (!tickets) tickets = [];
    if (idSchedule && idSeller) {
        if (p) {
            switch (p) {
                case "hoy":
                    tickets = tickets.filter(ticket => (ticket.idShiftSchedule == idSchedule)
                        && (ticket.idSeller == idSeller)
                        && isSameDay(ticket.date));
                    break;

                case "ayer":
                    tickets = tickets.filter(ticket => (ticket.idShiftSchedule == idSchedule)
                        && (ticket.idSeller == idSeller)
                        && isYesterday(ticket.date));
                    break;

                case "semana":
                    tickets = tickets.filter(ticket => (ticket.idShiftSchedule == idSchedule)
                        && (ticket.idSeller == idSeller)
                        && isSameWeek(ticket.date));
                    break;

                case "mes":
                    tickets = tickets.filter(ticket => (ticket.idShiftSchedule == idSchedule)
                        && (ticket.idSeller == idSeller)
                        && isSameMonth(ticket.date));
                    break;

                default:
                    tickets = tickets.filter(ticket => (ticket.idShiftSchedule == idSchedule)
                        && (ticket.idSeller == idSeller)
                        && isSameDay(ticket.date));
                    break;
            }
        } else {
            tickets = tickets.filter(ticket => (ticket.idShiftSchedule == idSchedule)
                && (ticket.idSeller == idSeller)
                && isSameDay(ticket.date));
        }
    } else if (idSchedule) {
        if (p) {
            switch (p) {
                case "hoy":
                    tickets = tickets.filter(ticket => (ticket.idShiftSchedule == idSchedule)
                        && isSameDay(ticket.date));
                    break;

                case "ayer":
                    tickets = tickets.filter(ticket => (ticket.idShiftSchedule == idSchedule)
                        && isYesterday(ticket.date));
                    break;

                case "semana":
                    tickets = tickets.filter(ticket => (ticket.idShiftSchedule == idSchedule)
                        && isSameWeek(ticket.date));
                    break;

                case "mes":
                    tickets = tickets.filter(ticket => (ticket.idShiftSchedule == idSchedule)
                        && isSameMonth(ticket.date));
                    break;

                default:
                    tickets = tickets.filter(ticket => (ticket.idShiftSchedule == idSchedule)
                        && isSameDay(ticket.date));
                    break;
            }
        } else {
            tickets = tickets.filter(ticket => (ticket.idShiftSchedule == idSchedule)
                && isSameDay(ticket.date));
        }
    }
    return tickets.sort(sortBy("date"));
}

export async function getNumbersBySchedule(scheduleId, number, query) {
    await fakeNetwork(`getNumbersBySchedule:${scheduleId},${number},${query}`);
    let tickets = await localforage.getItem("tickets");
    let sellers = await getSellers();
    let numbers = [];

    if (!tickets) tickets = [];
    if (scheduleId && number) {

        tickets = tickets.filter(ticket => (scheduleId == ticket.idShiftSchedule)
            && isSameDay(ticket.date));

        const ids = tickets.map(t => t.idTicket);
        let details = await getDetailsByTickets(ids);

        details = details.map(d => {
            const target = tickets.find((t) => t.idTicket == d.idTicket);

            let seller = sellers.find(s => s.idSeller == target.idSeller);

            // asign seller factor to number
            const newNumber = {
                ...d,
                idSeller: seller.idSeller,
            };

            return newNumber;
        });

        if (query) {
            details = matchSorter(details, query, { keys: ["idSeller"] });
        }

        numbers = details.filter(n => n.number == number);
    }

    return numbers.sort(sortBy("idTicket"));
}

/**
 * Este metodo se encarga de devolver los tickets en los que se
 * encuentre el turno y numero.
 * 
 * @param {scheduleId} 
 * @param {number} 
 * @param {query} 
 * @returns tickets
 */
export async function getTicketsByScheduleAndNumber(scheduleId, number, query) {
    await fakeNetwork(`getNumbersBySchedule:${scheduleId}`);
    let tickets = await localforage.getItem("tickets");
    let sellers = await getSellers();
    const schedules = await getSchedules();
    let numbers = [];

    if (!tickets) tickets = [];
    if (scheduleId && number) {

        tickets = tickets.filter(ticket => (scheduleId == ticket.idShiftSchedule)
            && isSameDay(ticket.date));

        let ids = tickets.map(t => t.idTicket);
        let details = await getDetailsByTickets(ids);

        numbers = details.filter(n => n.number == number);
        ids = numbers.map(n => n.idTicket);
        tickets = tickets.filter(t => ids.includes(t.idTicket));

        tickets = tickets.map(d => {
            let seller = sellers.find(s => s.idSeller == d.idSeller);
            let schedule = schedules.find(s => s.idShiftSchedule == d.idShiftSchedule);
            let number = numbers.find(n => n.idTicket == d.idTicket);

            // asign seller factor to number
            const newTicket = {
                ...d,
                seller: `${seller.firstName} ${seller.lastName}`,
                schedule: schedule.name,
                sale: number.price,
                factor: number.factor,
            };

            return newTicket;
        });
    }

    return tickets.sort(sortBy("idTicket"));
}

export async function getSalesDetails(sale_id) {
    const response = Object.create(null);

    const ticket = await getTicket(sale_id);
    const shiftSchedule = await getShiftSchedule(ticket.idShiftSchedule);
    const seller = await getSeller(ticket.idSeller);
    const details = await getDetailsByTicket(sale_id);

    response.ticketNumber = ticket.ticketNumber;
    response.date = ticket.date;
    response.shiftSchedule = shiftSchedule.name;
    response.seller = `${seller.firstName} ${seller.lastName}`;
    response.totalNumbers = details.length;

    // response.details = details.map(d => {
    //     return { ...d, factor: seller.factor * d.price };
    // });
    response.details = details;

    return response;
}

export async function getSales(idSchedule, idSeller, query, p) {
    const response = Object.create(null);
    const { name } = await getShiftSchedule(idSchedule);
    const seller = await getSeller(idSeller);
    const tickets = await getTickets(idSchedule, idSeller, query, p);

    const ids = tickets.map(t => t.idTicket);

    const details = await getDetailsByTickets(ids);
    let sales = tickets.map(t => {
        const total = details.filter(detail => detail.idTicket == t.idTicket)
            .reduce((totalSum, d) => totalSum + d.price, 0);
        return { ...t, total: total };
    });

    if (query) {
        sales = matchSorter(sales, query, { keys: ["ticketNumber"] });
    }

    response.shiftSchedule = name;
    response.seller = seller;
    response.tickets = sales;
    response.totalTickets = tickets.length;

    return response;
}

export async function createTicket(idShiftSchedule, idSeller) {
    const response = {};
    await fakeNetwork();
    let idTicket = await getLastId() + 1;
    const current_schedule = await getCurrentSchedule();

    if (!current_schedule) {
        response.msgError = `Error, el sistema se encuentra fuera de turno.`;
        response.ticket = {};
        return response;
    }

    if (current_schedule.idShiftSchedule != idShiftSchedule) {
        response.msgError = `Error, el turno actual es: ${current_schedule.name}`;
        response.ticket = {};
        return response;
    }

    let tickets = await getTickets();
    let aux = await getTickets(idShiftSchedule, idSeller);

    const ticketNumber = aux.length ? aux.length : 0;

    let ticket = { idTicket, ticketNumber: ticketNumber + 1, idSeller, idShiftSchedule, date: new Date().toJSON() };
    tickets.unshift(ticket);
    await set(tickets);

    response.ticket = ticket;
    return response;
}

export async function getSummary(p) {
    await fakeNetwork(`getSummary:${p}`);
    let tickets = await localforage.getItem("tickets");
    let winners = await getWinners();

    let response = new Object(null);

    if (!tickets) tickets = [];

    switch (p) {
        case "hoy":
            tickets = tickets.filter(ticket => isSameDay(ticket.date));
            winners = winners.filter(winner => isSameDay(winner.winDate));
            break;

        case "ayer":
            tickets = tickets.filter(ticket => isYesterday(ticket.date));
            winners = winners.filter(winner => isYesterday(winner.winDate));
            break;

        case "semana":
            tickets = tickets.filter(ticket => isSameWeek(ticket.date));
            winners = winners.filter(winner => isSameWeek(winner.winDate));
            break;

        case "mes":
            tickets = tickets.filter(ticket => isSameMonth(ticket.date));
            winners = winners.filter(winner => isSameMonth(winner.winDate));
            break;

        default:
            tickets = tickets.filter(ticket => isSameDay(ticket.date));
            winners = winners.filter(winner => isSameDay(winner.winDate));
            break;
    }

    const ids = tickets.map(t => t.idTicket);
    let salesBySeller = tickets.reduce((acc, ticket) => {
        const {idSeller} = ticket;
        acc[idSeller] = acc[idSeller] || [];
        acc[idSeller].push(ticket);
        return acc;
    }, []);

    let result = [];

    for (const key of Object.keys(salesBySeller)) {
        let seller = await getSeller(key);
        
        let obj = new Object(null);
        let total = 0;
        let _ids = salesBySeller[key].map(t => t.idTicket);

        let d = await getDetailsByTickets(_ids);
        total = d.reduce((acc, det) => acc += det.price, 0);
        
        obj.idSeller = key;
        obj.seller = `${seller.firstName} ${seller.lastName}`;
        obj.total = total;

        result.push(obj);
    }

    winners = await summaryWins(winners);

    // Get tickets
    let totalTickets = winners.map(t => t.tickets.length)
        .reduce((acc, t) => acc += t, 0);

    let wins = winners.map(w => w.winner);

    const details = await getDetailsByTickets(ids);

    let totalByNumbers = details.reduce((acc, n) => {
        const {number, price} = n;
        acc[number] = acc[number] || 0;
        acc[number] += price;
        return acc;
    }, {});

    const totalSales = details.reduce((acc, t) => {
        return acc += t.price;
    }, 0);

    const totalDisburse = winners.reduce((acc, t) => {
        return acc += t.winner.total;
    }, 0);

    result = result.sort(sortBy("-total"));
    totalByNumbers = Object.entries(totalByNumbers)
        .map(([number, total], i) => ({number, total, id: i + 1}));

    totalByNumbers = totalByNumbers.sort(sortBy("-total"));

    response.totalSales = totalSales;
    response.totalDisburse = totalDisburse;
    response.totalTickets = totalTickets;
    response.winners = wins;
    response.sellers = result;
    response.totalNumbers = totalByNumbers;

    return response;
}

export async function getTicket(sale_id) {
    await fakeNetwork(`ticket:${sale_id}`);
    let tickets = await localforage.getItem("tickets");
    let ticket = tickets.find(ticket => ticket.idTicket === sale_id);
    return ticket ?? null;
}

export async function updateContact(id, updates) {
    await fakeNetwork();
    let contacts = await localforage.getItem("contacts");
    let contact = contacts.find(contact => contact.id === id);
    if (!contact) throw new Error("No contact found for", id);
    Object.assign(contact, updates);
    await set(contacts);
    return contact;
}

export async function deleteContact(id) {
    let contacts = await localforage.getItem("contacts");
    let index = contacts.findIndex(contact => contact.id === id);
    if (index > -1) {
        contacts.splice(index, 1);
        await set(contacts);
        return true;
    }
    return false;
}

function set(sales) {
    return localforage.setItem("tickets", sales);
}

// fake a cache so we don't slow down stuff we've already seen
let fakeCache = {};

async function fakeNetwork(key) {
    if (!key) {
        fakeCache = {};
    }

    if (fakeCache[key]) {
        return;
    }

    fakeCache[key] = true;
    return new Promise(res => {
        setTimeout(res, Math.random() * 0);
    });
}

// util
export function isSameDay(date) {
    const currentDate = new Date();
    const targetDate = new Date(date);

    const compare = (
        currentDate.getFullYear() === targetDate.getFullYear() &&
        currentDate.getMonth() === targetDate.getMonth() &&
        currentDate.getDate() === targetDate.getDate()
    );

    return compare;
}

export function isYesterday(date) {
    let currentDate = new Date();
    const targetDate = new Date(date);
    currentDate.setDate(currentDate.getDate() - 1);

    const compare = (
        currentDate.getFullYear() === targetDate.getFullYear() &&
        currentDate.getMonth() === targetDate.getMonth() &&
        currentDate.getDate() === targetDate.getDate()
    );

    return compare;
}

export function isSameWeek(date) {
    let currentDate = new Date();
    const targetDate = new Date(date);
    currentDate.setDate(currentDate.getDate() - 7);

    const compare = (
        currentDate.getFullYear() === targetDate.getFullYear() &&
        currentDate.getMonth() === targetDate.getMonth() &&
        currentDate.getDate() <= targetDate.getDate()
    );

    return compare;
}

export function isSameMonth(date) {
    let currentDate = new Date();
    const targetDate = new Date(date);

    const compare = (
        currentDate.getFullYear() === targetDate.getFullYear() &&
        currentDate.getMonth() === targetDate.getMonth()
    );

    return compare;
}