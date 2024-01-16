import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

export async function getAll() {
    await fakeNetwork();
    let sellers = await localforage.getItem("schedules");

    return sellers;
}

export async function getNumberList(query) {
    await fakeNetwork(`getNumbers:${query}`);

    let numbers = await localforage.getItem("numbers");
    
    if (!numbers) {
        const numbersDB = numberList.map((number, index) => {
            let obj = new Object(null);
            obj.idNumber = index + 1;
            obj.number = number;
            obj.maxLimit = 250;
            obj.range = 10;

            return obj;
        });

        await set(numbersDB);
        numbers = await localforage.getItem("numbers");
    }

    if (query) {
        numbers = matchSorter(numbers, query, { keys: ["number", "maxLimit"] });
    }
    
    return numbers.sort(sortBy("idNumber"));
}

// export async function createShiftSchedule(firstName, lastName, factor) {
//     await fakeNetwork();
//     let all = await getShiftSchedule();
//     let seller = { idSeller: all.length + 1, firstName: firstName, lastName: lastName, factor: factor };
//     let sellers = await getShiftSchedule();
//     sellers.unshift(seller);
//     await set(sellers);
//     return seller;
// }
export async function updateNumber(id, updates) {
    await fakeNetwork();
    let numbers = await localforage.getItem("numbers");
    let number = numbers.find(number => number.idNumber === id);
    if (!number) throw new Error("No number found for", id);
    Object.assign(number, updates);
    await set(numbers);
    return number;
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

function set(numbers) {
    return localforage.setItem("numbers", numbers);
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


const numberList = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90', '91', '92', '93', '94', '95', '96', '97', '98', '99'];
