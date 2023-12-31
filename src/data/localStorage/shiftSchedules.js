import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

export async function getAll() {
    await fakeNetwork();
    let sellers = await localforage.getItem("schedules");

    return sellers;
}

export async function getSchedules(query) {
    await fakeNetwork(`getSchedules:${query}`);

    let schedules = await localforage.getItem("schedules");
    
    if (!schedules) {
        await set(shiftSchedules);
        schedules = await localforage.getItem("schedules");
    }
    
    return schedules.sort(sortBy("idShiftSchedule"));
}

export async function createShiftSchedule(firstName, lastName, factor) {
    await fakeNetwork();
    let all = await getShiftSchedule();
    let seller = { idSeller: all.length + 1, firstName: firstName, lastName: lastName, factor: factor };
    let sellers = await getShiftSchedule();
    sellers.unshift(seller);
    await set(sellers);
    return seller;
}

export const getCurrentSchedule = async() => {
    await fakeNetwork(`schedule`);
    let schedules = await getSchedules();
    
    let schedule = schedules.find(isAvailable);

    return schedule ?? null;
}

export async function getShiftSchedule(idShiftSchedule) {
    await fakeNetwork(`schedule:${idShiftSchedule}`);
    let schedules = await getSchedules();

    let schedule = schedules.find(schedule => schedule.idShiftSchedule === idShiftSchedule);
    
    return schedule ?? null;
}

export async function updateContact(id, updates) {
    await fakeNetwork();
    let contacts = await localforage.getItem("schedules");
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

function set(schedules) {
    return localforage.setItem("schedules", schedules);
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
class Seller {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
}

const shiftSchedules = [
    { idShiftSchedule: 1, name: 'Diurno', endHour: '11:00', onlySat: false, },
    { idShiftSchedule: 2, name: 'Vespertino', endHour: '15:00', onlySat: false, },
    { idShiftSchedule: 3, name: 'Noche', endHour: '21:00', onlySat: false, },
    { idShiftSchedule: 4, name: 'Extra', endHour: '16:50', onlySat: true, },
];

function isAvailable({endHour, onlySat}) {
    const c_date = new Date();
    const c_hour = c_date.getHours();
    const c_min = c_date.getMinutes();
    const c_day = c_date.getDate();
    const [hours, minutes] = endHour.split(':').map(Number);

    if(c_day === 6 && onlySat) {
        if(
            c_hour < hours
            || (c_hour === hours && c_min < minutes)
        ) {
            return true;
        } else {
            return false;
        }
    } else if(!onlySat) {
        if (
            c_hour < hours
            || (c_hour === hours && c_min < minutes)
        ) {
            return true;
        }
    }

    return false;
}