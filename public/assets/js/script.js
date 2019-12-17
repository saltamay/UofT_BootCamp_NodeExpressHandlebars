
async function handleClick() {
  try {
    const id = this.dataset.id;

    const res = await fetch(`/api/burgers/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({devoured: true})
    });
  } catch (error) {
    if(error) {
      console.log(error);
      throw error;
    }
  }
}

async function handleDevourAdd() {
  try {
    const id = this.dataset.id;

    const res = await fetch(`/api/burgers/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({devoured: true})
    });
  } catch (error) {
    if(error) {
      console.log(error);
      throw error;
    }
  }
}

async function handleDevour() {
  try {
    const id = this.dataset.id;

    const res = await fetch(`/api/burgers/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({devoured: false})
    });
  } catch (error) {
    if(error) {
      console.log(error);
      throw error;
    }
  }
}

function updateAll() {
  return new Promise((resolve, reject) => {
    const devourList = document.querySelectorAll('.devour .card .card-button a');
    for (let index = 0; index < devourList.length; index++) {
      try {
        const id = devourList[index].dataset.id;
        const res = fetch(`/api/burgers/${id}`, {
          method: 'PUT',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify({devoured: false})
        });
        if(res.ok && index === devourList.length - 1) {
          resolve();
        }
      } catch (error) {
        reject(error);
      }
    }
  })
}

async function handleDevourAll() {
  try {
    const res = await updateAll();
    window.location.replace('/devour');
  } catch (error) {
    if(error) {
      console.log(error);
      throw error;
    }
  }
}

function showModal() {
  $('#byobModal').modal('toggle');
}

async function handleBurgerSubmit() {

  const checkboxes = document.querySelectorAll('.form-check-input');
  
  let toppings = [];
  checkboxes.forEach(checkbox => {
    if(checkbox.checked) {
      toppings.push(checkbox.value);
    }
  });
  toppings = toppings.join(', ');
  
  let burger_info = document.querySelector('.btn.active p').innerText;
  burger_info += `\nToppings: ${toppings}`;

  const img_url = document.querySelector('.btn.active img').getAttribute('src');
  
  const burger_name = document.querySelector('input[type="text"]').value;
  
  const data = {
    burger_name: burger_name,
    burger_info: burger_info,
    img_url: img_url,
    devoured: true
  }

  try {
    const res = await fetch(`/api/burgers`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (res.ok) {
      window.location.replace('/devour');
    }
  } catch (error) {
    if(error) {
      console.log(error);
      throw error;
    }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  setTimeout(showModal, 3000);
})


