import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";
import { getNumbersBySchedule, getTicketsByScheduleAndNumber } from "./sales";
import { getSchedules, getShiftSchedule } from "./shiftSchedules";

export async function getLastId() {
    await fakeNetwork();
    let winner = await localforage.getItem("winners");

    return winner ? winner.length : 0;
}

export async function getWinners(query) {
    await fakeNetwork();
    let winners = await localforage.getItem("winners");

    // console.log(cDate, new Date(`${year}-${month}-${day} 00:00:00`) + ' hh');

    if (!winners) winners = [];

    winners = winners.filter(win => isSameDay(win.winDate));

    return winners.sort(sortBy("winDate"));
}

export async function summaryWins(array) {
    let wins = [];

    for (const element of array) {
        let win = await getWinner(element.idWinner);

        wins.push(win);
    }
    return wins;
}

export async function getWinner(id, query) {
    const response = Object.create(null);
    await fakeNetwork(`winner:${id},${query}`);
    let winners = await localforage.getItem("winners");
    let winner = winners.find(winner => winner.idWinner === id);
    const schedules = await getSchedules();

    let schedule = schedules.find(s => s.idShiftSchedule == winner.idShiftSchedule);
    const numbers = await getNumbersBySchedule(winner.idShiftSchedule, winner.number, query);

    // gets tickets by schedule and numbers
    let tickets = await getTicketsByScheduleAndNumber(winner.idShiftSchedule, winner.number);

    if (query) {
        tickets = matchSorter(tickets, query, { keys: ["idSeller"] });
    }

    const total = numbers.reduce((acc, number) => acc + number.factor, 0);

    const win = {
        idWinner: winner.idWinner,
        number: winner.number,
        schedule: schedule.name,
        winDate: winner.winDate,
        total: total,
    };

    response.winner = win;
    response.tickets = tickets;
    response.totalTickets = tickets.length;

    return response ?? null;
}

export async function getWins(query) {
    const response = Object.create(null);
    await fakeNetwork();
    let winners = await getWinners();
    const schedules = await getSchedules();

    // let numbers = winners.map(w => w.number);
    // let ids = winners.map(w => w.idShiftSchedule);

    // const tickets = await getTicketsBySchedulesId(ids);
    // ids = tickets.map(t => t.idTicket);

    // const wins = await getNumbersByTickets(ids, numbers);

    // const group = wins.reduce((acc, obj) => {
    //     const found = acc.find(item => item.number === obj.number);
    //     if (found) {
    //         found.total += obj.price;
    //     } else {
    //         acc.push({ number: obj.number, total: obj.price });
    //     }
    //     return acc;
    // }, []);

    // console.log(group);

    winners = winners.map(w => {
        let schedule = schedules.find(s => s.idShiftSchedule == w.idShiftSchedule);

        if (!schedule) {
            schedule = {};
        }

        return {
            idWinner: w.idWinner,
            number: w.number,
            schedule: schedule.name,
            winDate: w.winDate,
        };
    });

    response.numbers = winners;
    response.totalNumbers = winners.length;

    return response;
}

export async function getWinnerBySchedule(idSchedule, query) {
    await fakeNetwork(`getWinnerBySchedule:${idSchedule},${query}`);
    let winners = await localforage.getItem("winners");

    if (!winners) winners = [];
    if (idSchedule) {
        // winners = matchSorter(winners, query, { keys: ["idSeller", "idShiftSchedule"] });
        winners = winners.filter(winner => (winner.idShiftSchedule == idSchedule)
            && isSameDay(winner.winDate));
    }
    return winners.sort(sortBy("winDate"));
}

export async function createWinner(number, idSchedule) {
    let response = {};
    await fakeNetwork();
    let idWinner = await getLastId() + 1;
    const schedule = await getShiftSchedule(idSchedule);
    let msg = "";

    const win = await getWinnerBySchedule(idSchedule);
    if (win.length) {

        if (schedule) {
            msg = `El turno ${schedule.name} ya fue sorteado, intente más tarde.`;
        } else {
            msg = `No puedes ingresar más números fuera de turno.`;
        }

        response.msgError = msg;
        response.winner = {};
        return response;
    }
    let winner = { idWinner, number, idShiftSchedule: idSchedule, winDate: new Date().toJSON() };
    let winners = await getWinners();
    winners.unshift(winner);
    await set(winners);
    response.winner = winner;
    response.msgError = "";

    return response;
}

export async function createWin(number, idShiftSchedule) {
    await fakeNetwork();
    let idWinner = await getLastId() + 1;

    let winner = { idWinner, number, idShiftSchedule, winDate: new Date() };
    let winners = await getWinners();
    winners.unshift(winner);
    await set(winners);
    return winner;
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

export async function deleteWinner(id) {
    let winners = await localforage.getItem("winners");
    let index = winners.findIndex(win => win.idWinner === id);
    if (index > -1) {
        winners.splice(index, 1);
        await set(winners);
        return true;
    }
    return false;
}

function set(winners) {
    return localforage.setItem("winners", winners);
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