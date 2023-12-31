import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";
import { getCurrentSchedule, getSchedules, getShiftSchedule } from "./shiftSchedules";
import { getSeller, getSellers } from "./sellers";
import { getDetailsByTicket, getDetailsByTickets } from "./details";

export async function getLastId() {
    await fakeNetwork();
    let sales = await localforage.getItem("tickets");

    return sales ? sales.length : 0;
}

export async function getTickets(idSchedule, idSeller, query) {
    await fakeNetwork(`getTickets:${idSchedule},${idSeller}`);
    let tickets = await localforage.getItem("tickets");

    if (!tickets) tickets = [];
    if (idSchedule && idSeller) {
        //tickets = matchSorter(tickets, query, { keys: ["idSeller", "idShiftSchedule"] });

        tickets = tickets.filter(ticket => (ticket.idShiftSchedule == idSchedule)
            && (ticket.idSeller == idSeller)
            && isSameDay(ticket.date));
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
                factor: seller.factor,
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
                factor: number.price * seller.factor,
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

    response.details = details.map(d => {
        return { ...d, factor: seller.factor * d.price };
    });

    return response;
}

export async function getSales(idSchedule, idSeller, query) {
    const response = Object.create(null);
    const [{ name }] = await getSchedules(idSchedule);
    const seller = await getSeller(idSeller);
    const tickets = await getTickets(idSchedule, idSeller);

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

// classes
class Ticket {
    constructor(ticketNumber, shiftSchedule, seller) {
        this.ticketNumber = ticketNumber;
        this.shiftSchedule = shiftSchedule;
        this.seller = seller;
        this.date = new Date();
    }

    canSave() {
        if (this.shiftSchedule.isEnable(this.date.getHours())) {
            return false;
        }

        return true;
    }
}

// util
function isSameDay(date) {
    const currentDate = new Date();
    const targetDate = new Date(date);

    const compare = (
        currentDate.getFullYear() === targetDate.getFullYear() &&
        currentDate.getMonth() === targetDate.getMonth() &&
        currentDate.getDate() === targetDate.getDate()
    );

    return compare;
}