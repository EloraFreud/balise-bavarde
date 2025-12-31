// PFE Cursor App - Quiz Page JavaScript
// Interactive functionality for the quiz

document.addEventListener('DOMContentLoaded', async function() {
    const nextButton = document.getElementById('nextQuizButton');
    const closeQuizBtn = document.getElementById('closeQuizBtn');
    const quizQuestion = document.getElementById('quizQuestion');
    const answersContainer = document.querySelector('[data-node-id="11:227"]');
    let selectedAnswer = null;
    let currentQuiz = null;
    let plaquesData = null;
    
    // Charger les données des plaques
    async function loadPlaquesData() {
        if (plaquesData) {
            return plaquesData;
        }
        
        try {
            const response = await fetch('plaques-data.json');
            const data = await response.json();
            plaquesData = data.plaques;
            return plaquesData;
        } catch (error) {
            console.error('Erreur lors du chargement des données des plaques:', error);
            return [];
        }
    }
    
    // Trouver la plaque par ID ou titre
    function findPlaque(plaques, plaqueId, plaqueTitle) {
        if (plaqueId) {
            return plaques.find(p => p.id === plaqueId);
        }
        if (plaqueTitle) {
            return plaques.find(p => p.title === plaqueTitle);
        }
        return plaques[0];
    }
    
    // Charger et afficher le quiz
    const urlParams = new URLSearchParams(window.location.search);
    const plaqueId = urlParams.get('plaqueId');
    const plaqueTitle = urlParams.get('plaque');
    
    const plaques = await loadPlaquesData();
    const plaque = findPlaque(plaques, plaqueId, plaqueTitle);
    
    if (plaque && plaque.quiz) {
        currentQuiz = plaque.quiz;
        
        // Afficher la question
        if (quizQuestion) {
            quizQuestion.textContent = currentQuiz.question;
        }
        
        // Créer les réponses dynamiquement
        if (answersContainer) {
            answersContainer.innerHTML = '';
            
            currentQuiz.answers.forEach((answer, index) => {
                const answerDiv = document.createElement('div');
                answerDiv.className = 'quiz-answer bg-white border border-[#d7d7e0] flex gap-3 items-center justify-center p-4 relative rounded-2xl shadow-sm shrink-0 w-full';
                answerDiv.setAttribute('data-answer', answer);
                answerDiv.setAttribute('data-node-id', `11:${228 + index * 11}`);
                
                answerDiv.innerHTML = `
                    <div class="basis-0 flex flex-col gap-1 grow items-center justify-center min-h-px min-w-px relative shrink-0" data-name="Content" data-node-id="11:${229 + index * 11}">
                        <p class="font-content font-bold leading-[1.6] relative shrink-0 text-base text-[#24242e] whitespace-nowrap tracking-[-0.32px]">
                            ${answer}
                        </p>
                    </div>
                `;
                
                // Ajouter l'événement de clic
                answerDiv.addEventListener('click', function() {
                    // Remove selected class from all answers
                    document.querySelectorAll('.quiz-answer').forEach(a => {
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
                
                answersContainer.appendChild(answerDiv);
            });
        }
    } else {
        console.error('Quiz non trouvé pour cette plaque');
        // Afficher un message d'erreur ou rediriger
    }
    
    // Handle next button click
    if (nextButton) {
        nextButton.addEventListener('click', function() {
            if (!this.disabled && selectedAnswer && currentQuiz) {
                console.log('Next button clicked with answer:', selectedAnswer);
                
                // Check if answer is correct
                const isCorrect = selectedAnswer === currentQuiz.correctAnswer;
                
                // Get plaque name from URL if available
                const plaqueName = plaqueTitle || plaque?.title || 'Le soldat inconnu';
                const plaqueIdParam = plaqueId || plaque?.id || '';
                
                if (isCorrect) {
                    // Redirect to success page
                    window.location.href = `success.html?plaque=${encodeURIComponent(plaqueName)}&plaqueId=${encodeURIComponent(plaqueIdParam)}`;
                } else {
                    // Redirect to failure page
                    window.location.href = `failure.html?plaque=${encodeURIComponent(plaqueName)}&plaqueId=${encodeURIComponent(plaqueIdParam)}`;
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

