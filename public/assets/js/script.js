
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
