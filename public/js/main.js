const deleteBtn = document.querySelectorAll('.fa-trash')


Array.from(deleteBtn).forEach((element) => {
    element.addEventListener('click', deleteClub)
})




async function deleteClub(){
    const itemText = this.parentNode.childNodes[1].innerText
    try {
        const response = await fetch('deleteClub', {
            method: 'delete',
            headers: {'Content-Type': 'applications/json'},
            body: JSON.stringify({
                'itemFromJS': itemText
                
            })
        
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    } catch (error) {
        console.log(err)
    }
}