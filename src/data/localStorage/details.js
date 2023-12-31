import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

export async function getLastId() {
    await fakeNetwork();
    let sales = await localforage.getItem("details");

    return sales ? sales.length : 0;
}

export async function getAll() {
    await fakeNetwork(`getDetails:All`);
    let sales = await localforage.getItem("details");

    if (!sales) sales = [];

    return sales.sort(sortBy("idTicket"));
}

export async function getDetails(idSchedule, idSeller) {
    await fakeNetwork(`getDetails:${idSchedule},${idSeller}`);
    let sales = await localforage.getItem("details");

    if (!sales) sales = [];
    if (idSchedule && idSeller) {
        // sales = matchSorter(sales, query, { keys: ["idSeller", "idShiftSchedule"] });
        sales = sales.filter(ticket => (ticket.idShiftSchedule == idSchedule)
            && (ticket.idSeller == idSeller)
            && isSameDay(ticket.date, new Date(`${year}-${month}-${day} 00:00:00`)));
    }
    return sales.sort(sortBy("date"));
}

export async function getDetailsByTickets(tickets) {
    await fakeNetwork(`getDetailsByTickets:${tickets}`);

    let details = await localforage.getItem("details");

    if (!details) details = [];

    if (tickets) {
        details = details.filter(d => tickets.includes(d.idTicket));
    }

    return details.sort(sortBy("idTicket"));
}

export async function getDetailsByTicketId(idTicket) {
    await fakeNetwork(`getDetailsByTicketId:${idTicket}`);

    let details = await localforage.getItem("details");

    if (!details) details = [];

    if (idTicket) {
        details = details.filter(d => idTicket == d.idTicket);
    }

    return details.sort(sortBy("date"));
}

export async function getDetailsByNumber(number) {
    await fakeNetwork(`getDetailsByNumber:${number}`);

    let details = await localforage.getItem("details");

    if (!details) details = [];

    if (number) {
        details = details.filter(d => d.number == number);
    } else {
        details = [];
    }

    return details.sort(sortBy("date"));
}

export async function getNumbersBySchedule(idSchedule, number, query) {
    await fakeNetwork(`getNumbersBySchedule:${idSchedule},${number}`);
    let sales = await localforage.getItem("details");

    if (!sales) sales = [];
    if (idSchedule && number) {
        
        sales = sales.filter(n => (n.idShiftSchedule == idSchedule)
            && (n.number == number)
            && isSameDay(n.date));
    }
    return sales.sort(sortBy("date"));
}

export async function getNumbersByTickets(tickets, numbers) {
    await fakeNetwork(`getNumbersByTickets:${tickets}, ${numbers}`);

    let details = await localforage.getItem("details");

    if (!details) details = [];

    if (tickets && numbers) {
        details = details.filter(d => tickets.includes(d.idTicket) && numbers.includes(d.number));
    }

    return details.sort(sortBy("number"));
}

export async function getDetailsByTicket(sale_id) {
    await fakeNetwork(`getDetailsByNumber:${sale_id}`);

    let details = await localforage.getItem("details");

    if (!details) details = [];

    if (sale_id) {
        details = details.filter(d => d.idTicket == sale_id);
    } else {
        details = [];
    }

    return details.sort(sortBy("number"));
}

export async function createDetail(idTicket, number, price) {
    await fakeNetwork();

    let detail = { idTicket, number, price };
    let details = await getAll();

    const comparison = (data) => {
        return (
            data.idTicket == idTicket && data.number == number
        );
    };

    const target = details.find(data => comparison(data));

    if (target) {
        details = details.map(data => {
            if (comparison(data)) {
                data.price += price;
            }
            return data;
        });
    } else {
        details.unshift(detail);
    }

    await set(details);
    return detail;
}

export async function getDetial(id) {
    await fakeNetwork(`details:${id}`);
    let contacts = await localforage.getItem("details");
    let contact = contacts.find(contact => contact.id === id);
    return contact ?? null;
}

export async function updateDetail(idTicket, ticketNumber, updates) {
    await fakeNetwork();
    let details = await localforage.getItem("details");
    let detail = details.filter(d => d.idTicket == idTicket).find(d => d.number === ticketNumber);

    if (!detail) {
        if (idTicket && ticketNumber && updates) {
            detail = await createDetail(idTicket, ticketNumber, updates.price);
        }
    } else {
        Object.assign(detail, updates);
        await set(details);
    }
    return detail;
}

export async function deleteDetail(id, number) {
    let details = await localforage.getItem("details");
    let index = details.findIndex(detail => detail.idTicket === id && detail.number == number);

    if (index > -1) {
        details.splice(index, 1);
        await set(details);
        return true;
    }
    return false;
}

function set(sales) {
    return localforage.setItem("details", sales);
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

const numbers = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90', '91', '92', '93', '94', '95', '96', '97', '98', '99'];