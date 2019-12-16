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
