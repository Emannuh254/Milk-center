const baseUrl = 'https://json-server-iwsx.onrender.com/centers';

fetch(baseUrl)
  .then(response => response.json())
  .then(centers => {
    const centerList = document.getElementById('center-list');

    centers.forEach(center => {
      const centerDiv = document.createElement('div');
      centerDiv.classList.add('center');
      centerDiv.innerHTML = `
        <img src="${center.image}" alt="${center.name}" class="center-image">
        <h3>${center.name}</h3>
        <p>Location: ${center.location}</p>
        <p>Rating: ${center.rating}</p>
        <h4>Reviews:</h4>
        <ul></ul>
      `;

      renderReviews(center.reviews, centerDiv);

      const reviewForm = document.createElement('form');
      reviewForm.innerHTML = `
        <input type="text" name="user" placeholder="Your name" required>
        <textarea name="comment" placeholder="Your review" required></textarea>
        <input type="number" name="rating" placeholder="Rating (1-5)" min="1" max="5" required>
        <button type="submit">Submit Review</button>
      `;
      
      reviewForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newReview = {
          user: reviewForm.user.value,
          comment: reviewForm.comment.value,
          rating: parseInt(reviewForm.rating.value)
        };
        center.reviews.push(newReview);
        renderReviews(center.reviews, centerDiv);
        reviewForm.reset();
      });

      centerDiv.appendChild(reviewForm);
      centerList.appendChild(centerDiv);
    });
  })
  .catch(error => console.error('Error fetching centers:', error));

function renderReviews(reviews, centerDiv) {
  const reviewsList = centerDiv.querySelector('ul');
  reviewsList.innerHTML = '';
  reviews.forEach((review, index) => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${review.user}:</strong> ${review.comment} (${review.rating} stars)`;
    
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteReview(centerDiv, index));
    li.appendChild(deleteButton);
    reviewsList.appendChild(li);
  });
}

function deleteReview(centerDiv, reviewIndex) {
  centerDiv.querySelector('ul').children[reviewIndex].remove();
}

document.getElementById('dark-mode-toggle').addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  document.querySelectorAll('.center').forEach(center => {
    center.classList.toggle('dark-mode');
  });
});
