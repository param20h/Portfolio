// Random Quote Generator
document.addEventListener('DOMContentLoaded', function() {
    const quotes = [
        {
            text: "The only way to do great work is to love what you do.",
            author: "Steve Jobs"
        },
        {
            text: "Code is like humor. When you have to explain it, it's bad.",
            author: "Cory House"
        },
        {
            text: "First, solve the problem. Then, write the code.",
            author: "John Johnson"
        },
        {
            text: "Experience is the name everyone gives to their mistakes.",
            author: "Oscar Wilde"
        },
        {
            text: "In order to be irreplaceable, one must always be different.",
            author: "Coco Chanel"
        },
        {
            text: "Java is to JavaScript what car is to Carpet.",
            author: "Chris Heilmann"
        },
        {
            text: "The best error message is the one that never shows up.",
            author: "Thomas Fuchs"
        },
        {
            text: "Simplicity is the ultimate sophistication.",
            author: "Leonardo da Vinci"
        },
        {
            text: "Make it work, make it right, make it fast.",
            author: "Kent Beck"
        },
        {
            text: "The computer was born to solve problems that did not exist before.",
            author: "Bill Gates"
        },
        {
            text: "Programming isn't about what you know; it's about what you can figure out.",
            author: "Chris Pine"
        },
        {
            text: "The best way to get a project done faster is to start sooner.",
            author: "Jim Highsmith"
        },
        {
            text: "Code never lies, comments sometimes do.",
            author: "Ron Jeffries"
        },
        {
            text: "Debugging is twice as hard as writing the code in the first place.",
            author: "Brian Kernighan"
        },
        {
            text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
            author: "Martin Fowler"
        },
        {
            text: "Programs must be written for people to read, and only incidentally for machines to execute.",
            author: "Harold Abelson"
        },
        {
            text: "Talk is cheap. Show me the code.",
            author: "Linus Torvalds"
        },
        {
            text: "Walking on water and developing software from a specification are easy if both are frozen.",
            author: "Edward V. Berard"
        },
        {
            text: "Before software can be reusable it first has to be usable.",
            author: "Ralph Johnson"
        },
        {
            text: "Good code is its own best documentation.",
            author: "Steve McConnell"
        },
        {
            text: "Simplicity is prerequisite for reliability.",
            author: "Edsger W. Dijkstra"
        },
        {
            text: "Controlling complexity is the essence of computer programming.",
            author: "Brian Kernighan"
        },
        {
            text: "If debugging is the process of removing software bugs, then programming must be the process of putting them in.",
            author: "Edsger W. Dijkstra"
        },
        {
            text: "The most disastrous thing that you can ever learn is your first programming language.",
            author: "Alan Kay"
        },
        {
            text: "Testing leads to failure, and failure leads to understanding.",
            author: "Burt Rutan"
        }
    ];
    
    const quoteWidget = document.getElementById('quote-widget');
    const quoteText = document.getElementById('quote-text');
    const quoteAuthor = document.getElementById('quote-author');
    
    let currentQuoteIndex = 0;
    
    function displayRandomQuote() {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const quote = quotes[randomIndex];
        currentQuoteIndex = randomIndex;
        
        // Fade out
        quoteWidget.style.opacity = '0.5';
        
        setTimeout(() => {
            quoteText.textContent = `"${quote.text}"`;
            quoteAuthor.textContent = `- ${quote.author}`;
            
            // Fade in
            quoteWidget.style.opacity = '1';
            
            // Add pulse effect
            quoteWidget.style.transform = 'scale(1.05)';
            setTimeout(() => {
                quoteWidget.style.transform = 'scale(1)';
            }, 200);
        }, 150);
    }
    
    // Click to get new quote
    if (quoteWidget) {
        quoteWidget.addEventListener('click', displayRandomQuote);
        
        // Hover effects
        quoteWidget.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        quoteWidget.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
        
        // Auto-change quote every 10 seconds
        setInterval(displayRandomQuote, 10000);
        
        // Show first quote after 2 seconds
        setTimeout(displayRandomQuote, 2000);
        
        // Add floating animation CSS
        const style = document.createElement('style');
        style.textContent = `
            @keyframes quoteFloat {
                0% { transform: translateY(0px); }
                100% { transform: translateY(-5px); }
            }
        `;
        document.head.appendChild(style);
    }
});