import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";
import { getNumbersBySchedule, getTicket, getTickets, isSameDay } from "./sales";
import { getSeller, getSellers } from "./sellers";
import { getShiftSchedule } from "./shiftSchedules";
import { getNumberList } from "./numbers";

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
            && isSameDay(ticket.date));
    }
    return sales.sort(sortBy("number"));
}

export async function getNumbers(idSchedule, query) {
    let response = new Object(null);
    
    await fakeNetwork(`getNumbers:${idSchedule}`);
    let sales = await getDetailsBySchedule(idSchedule);

    if (sales.length) {
        sales = sales.reduce((acc, obj) => {
            const {idTicket, number, price, factor} = obj;
            const exists = acc.find(item => item.number == number);
            if(exists) {
                exists.price += price;
                exists.factor += factor;
            } else {
                acc.push({idTicket, number, price, factor});
            }
            return acc;
        }, []);
    }

    const total = sales.reduce((acc, number) => acc + number.price, 0);

    if (query) {
        sales = matchSorter(sales, query, { keys: ["number"] });
    }

    response.numbers = sales.sort(sortBy("number"));
    response.totalSales = total;
    response.totalNumbers = sales.length;

    return response;
}

export async function getDetailsBySchedule(idSchedule) {
    await fakeNetwork(`getDetailsBySchedule:${idSchedule}`);
    let tickets = await getTickets(idSchedule);

    if (!tickets) tickets = [];
    if (idSchedule) {
        tickets = tickets.filter(ticket => (ticket.idShiftSchedule == idSchedule)
            && isSameDay(ticket.date));
    } else {
        tickets = tickets.filter(ticket => isSameDay(ticket.date));
    }
    
    const ids = tickets.map(ticket => ticket.idTicket);
    const sales = await getDetailsByTickets(ids);
    return sales.sort(sortBy("number"));
}

export async function getDetailOfNumber(number, idSchedule) {
    await fakeNetwork(`getDetailOfNumber:${number},${idSchedule}`);
    let response = new Object(null);

    let numbers = await getNumbersBySchedule(idSchedule, number);
    const sellers = await getSellers();
    const schedule = await getShiftSchedule(idSchedule);

    const numberList = await getNumberList();
    const _number = numberList.find(n => n.number == number);
    
    if (numbers.length) {
        numbers = numbers.reduce((acc, obj) => {
            const {number, price, factor, idSeller} = obj;
            const exists = acc.find(item => item.number == number && item.idSeller == idSeller);
            if(exists) {
                exists.price += price;
                exists.factor += factor;
            } else {
                acc.push({number, price, factor, idSeller});
            }
            return acc;
        }, []);
    }

    numbers = numbers.map(n => {
        let obj = new Object(null);
        let seller = sellers.find(s => s.idSeller == n.idSeller);
        if(seller) {
            obj = {
                ...n,
                seller: `${seller.firstName} ${seller.lastName}`,
            };
        } else {
            obj = {
                ...n,
            };
        }
        return obj;
    });

    const totalDisburse = numbers.reduce((acc, number) => acc + number.factor, 0);
    const currentSales = numbers.reduce((acc, number) => acc + number.price, 0);

    response.numbers = numbers;
    response.number = number;
    response.schedule = schedule.name;
    response.totalDisburse = totalDisburse;
    response.maxLimit = _number.maxLimit;
    response.range = _number.range;
    response.currentSales = currentSales;

    return response;
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

// export async function getNumbersBySchedule(idSchedule, number, query) {
//     await fakeNetwork(`getNumbersBySchedule:${idSchedule},${number}`);
//     let sales = await localforage.getItem("details");

//     if (!sales) sales = [];
//     if (idSchedule && number) {
        
//         sales = sales.filter(n => (n.idShiftSchedule == idSchedule)
//             && (n.number == number)
//             && isSameDay(n.date));
//     }
//     return sales.sort(sortBy("date"));
// }

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

    const ticket = await getTicket(idTicket);
    const seller = await getSeller(ticket.idSeller);

    let detail = { idTicket, number, price, factor: seller.factor * price };
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