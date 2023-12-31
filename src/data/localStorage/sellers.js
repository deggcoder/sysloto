import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

export async function getAll() {
    await fakeNetwork();
    let sellers = await localforage.getItem("sellers");

    return sellers;
}

export async function getSellers(query) {
    await fakeNetwork(`getSellers:${query}`);
    let sellers = await localforage.getItem("sellers");
    if (!sellers) sellers = [];
    if (query) {
        sellers = matchSorter(sellers, query, { keys: ["factor", "firstname"] });
    }
    return sellers.sort(sortBy("idSeller", "firstname"));
}

export async function createSeller(firstName, lastName, factor) {
    await fakeNetwork();
    let all = await getSellers();
    let seller = { idSeller: all.length + 1, firstName: firstName, lastName: lastName, factor: factor };
    let sellers = await getSellers();
    sellers.unshift(seller);
    await set(sellers);
    return seller;
}

export async function getSeller(id) {
    await fakeNetwork(`seller:${id}`);
    let sellers = await localforage.getItem("sellers");
    let seller = sellers.find(seller => seller.idSeller == id);
    return seller ?? null;
}

export async function updateSeller(id, updates) {
    await fakeNetwork();
    let sellers = await localforage.getItem("sellers");
    let seller = sellers.find(seller => seller.idSeller === id);
    if (!seller) throw new Error("No hay conincidencias para el vendedor con id", id);
    Object.assign(seller, updates);
    await set(sellers);
    return seller;
}

export async function deleteSeller(id) {
    let sellers = await localforage.getItem("sellers");
    let index = sellers.findIndex(seller => seller.idSeller === id);
    if (index > -1) {
        sellers.splice(index, 1);
        await set(sellers);
        return true;
    }
    return false;
}

function set(sellers) {
    return localforage.setItem("sellers", sellers);
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