document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('survey-form');
    const formCountElement = document.getElementById('form-count');
    const submittedFormsTableBody = document.getElementById('submitted-forms-table').querySelector('tbody');
    let formCount = 0;

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = form.elements['name'].value;
        const email = form.elements['email'].value;
        const projectLink = form.elements['project-link'].value;
        const hostedLink = form.elements['hosted-link'].value;
        const mobileNumber = form.elements['mobile-number'].value;

        formCount++;
        formCountElement.textContent = formCount;

        const newRow = document.createElement('tr');
        const nameCell = document.createElement('td');
        const actionsCell = document.createElement('td');
        const nameLink = document.createElement('a');
        const deleteButton = document.createElement('button');

        nameLink.textContent = name;
        nameLink.href = '#';
        nameLink.addEventListener('click', function(event) {
            event.preventDefault();
            showDetails(nameLink, name, email, projectLink, hostedLink, mobileNumber);
        });

        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete-btn';
        deleteButton.addEventListener('click', function() {
            deleteRow(newRow);
        });

        const actionButtonsDiv = document.createElement('div');
        actionButtonsDiv.className = 'action-buttons';
        actionButtonsDiv.appendChild(deleteButton);

        nameCell.appendChild(nameLink);
        actionsCell.appendChild(actionButtonsDiv);
        newRow.appendChild(nameCell);
        newRow.appendChild(actionsCell);

        submittedFormsTableBody.appendChild(newRow);

        form.reset();
    });

    function showDetails(link, name, email, projectLink, hostedLink, mobileNumber) {
        let detailsDiv = link.parentElement.querySelector('.details');
        
        if (detailsDiv) {
            detailsDiv.style.display = detailsDiv.style.display === 'none' ? 'block' : 'none';
        } else {
            detailsDiv = document.createElement('div');
            detailsDiv.className = 'details';
            detailsDiv.innerHTML = `
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Project Link:</strong> <a href="${projectLink}" target="_blank">${projectLink}</a></p>
                <p><strong>Hosted Link:</strong> <a href="${hostedLink}" target="_blank">${hostedLink}</a></p>
                <p><strong>Mobile Number:</strong> ${mobileNumber}</p>
                <button>Cancel</button>
            `;
            link.parentElement.appendChild(detailsDiv);
            
            const cancelButton = detailsDiv.querySelector('button');
            cancelButton.addEventListener('click', function() {
                detailsDiv.style.display = 'none';
            });
        }
    }

    function deleteRow(row) {
        row.remove();
        formCount--;
        formCountElement.textContent = formCount;
    }
});
