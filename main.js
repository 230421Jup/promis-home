document.querySelector('#submit-btn').addEventListener('click', () => {
    event.preventDefault();
    const productName = document.querySelector('#product-name').value;
    const reviewText = document.querySelector('#review-text').value;

    // Проверяем, что оба поля заполнены 
    if (productName && reviewText ) {
        let savedReviews = JSON.parse(localStorage.getItem('savedReviews')) || [];
        savedReviews.unshift({ productName: productName, reviewText: reviewText });
        localStorage.setItem('savedReviews', JSON.stringify(savedReviews));
        displayReviews(savedReviews);
    } else {
        alert('Заполните оба поля!');
    }
});

function displayReviews(savedReviews) {
    const reviewsList = document.querySelector('#reviews-list');
    reviewsList.innerHTML = '';
    if (savedReviews.length === 0) {
        const noReviewMessage = document.createElement('p');
        noReviewMessage.textContent = 'Отзывов пока нет!';
        reviewsList.appendChild(noReviewMessage);
    } else {
        savedReviews.forEach((review, index) => {
            const listItem = document.createElement('li');
            listItem.dataset.index = index;
            listItem.innerHTML = `
                <h3 class="product-name">${review.productName}</h3>
                <p class="review-text">${review.reviewText}</p>
                <button class="delete-button">Удалить</button>
            `;
            reviewsList.appendChild(listItem);
        });
    }
}

// Функция для удаления отзыва
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-button')) {
        const index = event.target.parentElement.dataset.index;
        deleteReview(index, event);
    }
});
function deleteReview(index) {
    let savedReviews = JSON.parse(localStorage.getItem('savedReviews')) || [];
    savedReviews.splice(index, 1);
    localStorage.setItem('savedReviews', JSON.stringify(savedReviews));
    displayReviews(savedReviews);
}

document.addEventListener('DOMContentLoaded', () => {
    const savedReviews = JSON.parse(localStorage.getItem('savedReviews')) || [];
    displayReviews(savedReviews);
});