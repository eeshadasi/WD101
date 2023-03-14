const names_to_entry = document.getElementById("name");

const terms_to_entry = document.getElementById("acceptTerms");
const sub_to_entry = document.getElementById("submit");
const hist_to_enry = document.getElementById("dat");
const date = new Date();
let x;
let u;
let eesha= new Date();
const hibhye= document.getElementById("dob");
let listuu_of_itemsss = []
const emails_to_entry = document.getElementById("email");
const pass_to_entry = document.getElementById("password");
const dob_to_entry = document.getElementById("dob");
const dateValidity = (start_date) => {
    const date_use=start_date.replace("-",".")
    const date_dobb = date_use.split("-").map((d) => Number(d))
    const year_dobb = ( date_dobb[0] <= (date.getFullYear() - 18) &&  date_dobb[0] >= (date.getFullYear() - 55))
    let month_dobb;
    let day_date;
    if (date_dobb[0] === date.getFullYear() - 55) {
        month_dobb = date_dobb[1] >= (date.getMonth() + 1)
        day_date = date_dobb[2] >= (date.getDate())
    } else if (year_dobb) {
        month_dobb = true
        day_date = true
    } else if (date_dobb[0] === date.getFullYear() - 18) {
        month_dobb = date_dobb[1] <= (date.getMonth() + 1)
        day_date = date_dobb[2] <= (date.getDate())
    } else {
        month_dobb = false
        day_date = false
    }
    
    return year_dobb && month_dobb && day_date;
}

const d_num = (num) => {
    if (num < 10) {
        return "0" + num;
    } else {
        return num;
    }
}
const isvalid = (ele) => {
    return ele.validity.valid
}

let q;
const sent_data = (name, email, password, dob, terms) => {
    const data_of_user = {
        name,
        email,
        password,
        dob,
        terms
    }
    listuu_of_itemsss.push(data_of_user)
    localStorage.setItem('userData', JSON.stringify(listuu_of_itemsss))
}
let i;

sub_to_entry.addEventListener("click", () => {
    const date_dobb = dob_to_entry.value

    if (!dateValidity(date_dobb)) {
        dob_to_entry.setCustomValidity(`Date must be between ${date.getFullYear() - 55}-${d_num(date.getMonth() + 1)}-${d_num(date.getDate())} and ${date.getFullYear() - 18}-${d_num(date.getMonth() + 1)}-${d_num(date.getDate())}`)
    } else {
        dob_to_entry.setCustomValidity("")
    }
    let o;

    const valid_list_details = isvalid(names_to_entry) && isvalid(emails_to_entry) && isvalid(pass_to_entry) && isvalid(dob_to_entry)

    if (valid_list_details) {
        sent_data(names_to_entry.value, emails_to_entry.value, pass_to_entry.value, dob_to_entry.value, terms_to_entry.checked)
    }
})
const stored_doc = () => {
    listuu_of_itemsss = JSON.parse(localStorage.getItem("userData"))
    if (listuu_of_itemsss === null) {
        listuu_of_itemsss = []
    } else {
       
        const view = listuu_of_itemsss.map((entry) => {
            let table_ro2 = ""
            const allKeys = Object.keys(entry)
            const len_of = allKeys.length;

            for (let i = 0; i < allKeys.length; i++) {
                table_ro2 += `<td>${entry[allKeys[i]]}</td>`
            }

            return `<tr>${table_ro2}</tr>`
        })
        hist_to_enry.innerHTML += view.join("\n")
    }
}



stored_doc()

