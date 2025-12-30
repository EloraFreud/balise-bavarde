// PFE Cursor App - Quiz Page JavaScript
// Interactive functionality for the quiz

document.addEventListener('DOMContentLoaded', function() {
    const answers = document.querySelectorAll('.quiz-answer');
    const nextButton = document.getElementById('nextQuizButton');
    const closeQuizBtn = document.getElementById('closeQuizBtn');
    let selectedAnswer = null;
    
    // Handle answer selection
    answers.forEach(answer => {
        answer.addEventListener('click', function() {
            // Remove selected class from all answers
            answers.forEach(a => {
                a.classList.remove('selected');
                const text = a.querySelector('p');
                if (text) {
                    text.classList.remove('text-white');
                    text.classList.add('text-[#24242e]');
                }
            });
            
            // Add selected class to clicked answer
            this.classList.add('selected');
            const text = this.querySelector('p');
            if (text) {
                text.classList.remove('text-[#24242e]');
                text.classList.add('text-white');
            }
            
            // Store selected answer
            selectedAnswer = this.getAttribute('data-answer');
            
            // Enable the next button
            if (nextButton) {
                nextButton.disabled = false;
            }
            
            console.log('Answer selected:', selectedAnswer);
        });
    });
    
    // Handle next button click
    if (nextButton) {
        nextButton.addEventListener('click', function() {
            if (!this.disabled && selectedAnswer) {
                console.log('Next button clicked with answer:', selectedAnswer);
                
                // Check if answer is correct (18h30 is the correct answer)
                const correctAnswer = '18h30';
                const isCorrect = selectedAnswer === correctAnswer;
                
                // Get plaque name from URL if available
                const urlParams = new URLSearchParams(window.location.search);
                const plaqueName = urlParams.get('plaque') || 'Le soldat inconnu';
                
                if (isCorrect) {
                    // Redirect to success page
                    window.location.href = `success.html?plaque=${encodeURIComponent(plaqueName)}`;
                } else {
                    // Redirect to failure page (will be created next)
                    window.location.href = `failure.html?plaque=${encodeURIComponent(plaqueName)}`;
                }
            }
        });
    }
    
    // Handle close button
    if (closeQuizBtn) {
        closeQuizBtn.addEventListener('click', function() {
            // Go back to previous page
            if (window.history.length > 1) {
                window.history.back();
            } else {
                window.location.href = 'index.html';
            }
        });
    }
    
    // Responsive adjustments
    function handleResize() {
        const container = document.querySelector('.app-container');
        if (window.innerWidth < 390) {
            if (container) {
                container.style.maxWidth = '100%';
            }
        } else {
            if (container) {
                container.style.maxWidth = '390px';
            }
        }
    }
    
    window.addEventListener('resize', handleResize);
    handleResize();
});

