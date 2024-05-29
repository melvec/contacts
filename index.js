const API_URL = "https://randomuser.me/api/?results=50";
let contactList = [];

const fetchUsers = async (url) => {
  const userData = await fetch(url)
    .then((response) => response.json())
    .then((data) => data.results)
    .catch((error) => {
      console.log("User Data", error);
    });

  try {
    const response = await fetch(url);
    const data = await response.json();
    contactList = data.results;
    displayContacts(contactList);
  } catch (error) {
    console.error(error);
  }
};

const displayContacts = (contactList) => {
  document.getElementById("output").innerHTML = contactList
    .map(
      (user) =>
        `
          <div class="contact-card">
            <div class="id-card row">
                <div class="col-md-4 text-center">
                    <img src=${user.picture.large} alt="Profile Photo">
                </div>
                <div class="col-md-8">
                    <h3>${user.name.first} ${user.name.last}</h3>
                    <p><strong>Phone:</strong> ${user.cell}</p>
                    <p><strong>Email:</strong> ${user.email}</p>
                    <p><strong>Address:</strong> ${user.location.street.number} ${user.location.street.name}, ${user.location.state}</p>
                </div>
            </div>
          </div>
        `
    )
    .join("");
};

const onSearch = (input) => {
  const searchTerm = input.value.toLowerCase();
  const filteredContacts = contactList.filter((user) =>
    `${user.name.first} ${user.name.last}`.toLowerCase().includes(searchTerm)
  );
  displayContacts(filteredContacts);
};

const handleOnGenderSelect = (e) => {
  const gender = e.value.toLowerCase();
  const gender_API_URL = API_URL + "&gender=" + gender;
  fetchUsers(gender_API_URL);
};

fetchUsers(API_URL);
