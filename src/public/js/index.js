var listFriend = [
    {
        id: 1,
        name: 'Albert B Oliphant',
        address: '122 Drainer Avenue',
        phone: '712 - 341 - 8415'
    },

    {
        id: 2,
        name: 'Sharon E Garcia',
        address: '540 Jacobs Street',
        phone: '412 - 240 - 3536'
    },
    {
        id: 3,
        name: 'David H Olmos',
        address: '329 Emily Renzelli Boulevard',
        phone: '831 - 636 - 9428'
    },
    {
        id: 4,
        name: 'George L Pedroza',
        address: '287 Robinson Lane',
        phone: '740 - 210 - 2950'
    },
    {
        id: 5,
        name: 'Jose A Goforth',
        address: '1161 Stoney Lane',
        phone: '972 - 933 - 9459'
    },
]


const list = document.querySelector(".list-friend")
const addFriend = document.querySelector('.btn-add-friends')

let showModalEdit = (user) => `<!-- Modal -->
<div class="modal fade" id="staticBackdrop2${user.id}" data-bs-backdrop="true" data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="staticBackdropLabel" aria-hidden="true" keyboard="true">
    <div class="modal-dialog modal-add">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">
                    <i class="fa-solid fa-user-plus"></i> EDIT FRIENDS 
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="form-edit-friend">
                    <div class="mb-3">
                        <label class="form-label ">Name</label>
                        <div class="input align-items-center">
                            <input type="name" class="form-control name nameEdit${user.id}" value="${user.name}">
                            <div class="icon-form" data-bs-toggle="tooltip" data-bs-placement="right"
                                title="Required">
                                <i class=" fa-regular fa-circle-question"></i>
                            </div>
                        </div>
                        <br>
                        <label class="form-label ">Address</label>
                        <div class="input align-items-center ">
                            <input type="name" class="form-control address addressEdit${user.id}" value="${user.address}">
                            <div class="icon-form" data-bs-toggle="tooltip" data-bs-placement="right"
                                title="Required">
                                <i class=" fa-regular fa-circle-question"></i>
                            </div>
                        </div>
                        <br>
                        <label class="form-label ">Phone Number</label>
                        <div class="input align-items-center">
                            <input type="text" class="form-control phone phoneEdit${user.id}" value="${user.phone}">
                            <div class="icon-form" data-bs-toggle="tooltip" data-bs-placement="right"
                                title="Required">
                                <i class=" fa-regular fa-circle-question"></i>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary btn-edit-friends" data-bs-dismiss="modal" onclick="edit(${user.id}, '${user.name}', '${user.address}', ${user.phone})">Edit Friend</button>
                <button type="button" class="btn btn-secondary btn-edit-cancel" data-bs-dismiss="modal">Cancel</button>
            </div>
        </div>
    </div>
</div>`;



function render(listFriend) {
    let stringNon = '';
    for (let user of listFriend) {
        stringNon += `<div class="col-xs-1  col-md-6 col-lg-4 col-xl-3 friends">
        <div class="card border-dark bg-dark">
            <div class="card-body ">
                <h5 class="card-title d-flex align-items-center ">
                    <div class=" img-user">
                        <img src="./public/img/icon-user.901b481e.svg" alt="">
                    </div>
                    ${user.name}
                </h5>
    
                <p><i class="fa-solid fa-house-chimney"></i> ${user.address}</p>
                <p><i class="fa-solid fa-phone"></i> ${user.phone}</p>
                <div class="edit d-flex justify-content-end">
                    <button type="button" class="btn btn-success" data-bs-toggle="modal" 
                    data-bs-target="#staticBackdrop2${user.id}"><i class="fa-solid fa-pen"></i>
                        Edit</button>
                    ` + showModalEdit(user) + `
                    <button type="button" class="btn btn-danger" onclick="deleteBtn(${user.id})"><i class="fa-solid fa-trash-can"></i>
                        Delete</button>
                </div>
            </div>
        </div>
    </div>`;
    }

    list.innerHTML = stringNon
}

render(listFriend)

function edit(id, name, ad, phone) {
    name = document.querySelector(`.nameEdit${id}`).value;
    ad = document.querySelector(`.addressEdit${id}`).value;
    phone = document.querySelector(`.phoneEdit${id}`).value;

    const listFriendIndex = listFriend.findIndex((obj) => obj.id == id)
    // (document.querySelector('.btn-edit-cancel') as HTMLElement).click();
    listFriend[listFriendIndex].name = name
    listFriend[listFriendIndex].address = ad
    listFriend[listFriendIndex].phone = phone

    render(listFriend);
}

function deleteBtn(id) {
    const userDelete = listFriend.findIndex((user) => user.id == id)
    listFriend.splice(userDelete, 1)
    render(listFriend)
}

let id = 6;
addFriend.onclick = function () {

    const inputName = document.querySelector('.name').value
    const inputAddress = document.querySelector('.address').value
    const inputphone = document.querySelector('.phone').value

    if (inputName == '' || inputAddress == '') {

    } else {
        listFriend.push({
            id: id++,
            name: inputName,
            address: inputAddress,
            phone: inputphone
        })
        console.log(listFriend)
        render(listFriend)
        document.querySelector('.btn-close').click()
        document.querySelector('#form-add-friend').reset()
    }

}


const sapXep = document.querySelector('.btn-secondary')

sapXep.onclick = function () {
    const newListFriends = [...listFriend]


    newListFriends.sort((a, b) => {
        if (a.name < b.name) {
            return -1;
        }
        if (a.name > b.name) {
            return 1;
        }
        return 0;
    });

    console.log(newListFriends)
    render(newListFriends)
}


// seach
const filterFriends = document.querySelector('.filter-friends')


filterFriends.onkeyup = function () {
    const filterFriendsValue = document.querySelector('.filter-friends').value


    const searchFriend = listFriend.filter(user => !user.name.indexOf(filterFriendsValue) || !user.address.indexOf(filterFriendsValue) || !user.phone.indexOf(filterFriendsValue))
    render(searchFriend)
}