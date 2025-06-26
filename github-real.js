// Real GitHub Stats for param20h
document.addEventListener('DOMContentLoaded', function() {
    const username = 'param20h';
    
    async function fetchGitHubStats() {
        try {
            console.log('Fetching real GitHub stats for:', username);
            
            // Fetch user data
            const userResponse = await fetch(`https://api.github.com/users/${username}`);
            if (!userResponse.ok) throw new Error('User data fetch failed');
            const userData = await userResponse.json();
            
            // Fetch repositories
            const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
            if (!reposResponse.ok) throw new Error('Repos data fetch failed');
            const reposData = await reposResponse.json();
            
            // Calculate stats
            const totalStars = reposData.reduce((sum, repo) => sum + repo.stargazers_count, 0);
            const totalForks = reposData.reduce((sum, repo) => sum + repo.forks_count, 0);
            
            // Update counters with animation
            animateCounter('repos-count', userData.public_repos);
            animateCounter('followers-count', userData.followers);
            animateCounter('stars-count', totalStars);
            animateCounter('forks-count', totalForks);
            
            // Update languages
            displayLanguages(reposData);
            
            // Update recent repos
            displayRecentRepos(reposData);
            
            console.log('GitHub stats loaded successfully!');
            
        } catch (error) {
            console.error('Error fetching GitHub stats:', error);
            showFallbackStats();
        }
    }
    
    function animateCounter(elementId, targetValue) {
        const element = document.getElementById(elementId);
        if (!element) return;
        
        let currentValue = 0;
        const increment = Math.ceil(targetValue / 50);
        const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= targetValue) {
                currentValue = targetValue;
                clearInterval(timer);
            }
            element.textContent = currentValue;
        }, 30);
    }
    
    function displayLanguages(repos) {
        const languages = {};
        
        repos.forEach(repo => {
            if (repo.language) {
                languages[repo.language] = (languages[repo.language] || 0) + 1;
            }
        });
        
        const sortedLanguages = Object.entries(languages)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 5);
        
        const total = sortedLanguages.reduce((sum, [,count]) => sum + count, 0);
        
        const languagesList = document.getElementById('languages-list');
        if (languagesList) {
            languagesList.innerHTML = sortedLanguages.map(([lang, count]) => {
                const percentage = Math.round((count / total) * 100);
                return `
                    <div class="language-item">
                        <span>${lang}</span>
                        <div class="language-bar">
                            <div class="language-progress" style="width: ${percentage}%"></div>
                        </div>
                        <span>${percentage}%</span>
                    </div>
                `;
            }).join('');
        }
    }
    
    function displayRecentRepos(repos) {
        const recentRepos = document.getElementById('recent-repos');
        if (!recentRepos) return;
        
        const sortedRepos = repos
            .filter(repo => !repo.fork)
            .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
            .slice(0, 4);
        
        recentRepos.innerHTML = sortedRepos.map(repo => `
            <div class="repo-item">
                <div class="repo-name">${repo.name}</div>
                <div class="repo-desc">${repo.description || 'No description available'}</div>
                <div class="repo-lang">${repo.language || 'Unknown'}</div>
            </div>
        `).join('');
    }
    
    function showFallbackStats() {
        // Show demo data if API fails
        animateCounter('repos-count', 15);
        animateCounter('stars-count', 42);
        animateCounter('forks-count', 8);
        animateCounter('followers-count', 25);
        
        document.getElementById('languages-list').innerHTML = `
            <div class="language-item">
                <span>Python</span>
                <div class="language-bar">
                    <div class="language-progress" style="width: 85%"></div>
                </div>
                <span>85%</span>
            </div>
            <div class="language-item">
                <span>JavaScript</span>
                <div class="language-bar">
                    <div class="language-progress" style="width: 70%"></div>
                </div>
                <span>70%</span>
            </div>
        `;
        
        document.getElementById('recent-repos').innerHTML = `
            <div class="repo-item">
                <div class="repo-name">AI-Financial-System</div>
                <div class="repo-desc">AI-based financial identification system</div>
                <div class="repo-lang">Python</div>
            </div>
            <div class="repo-item">
                <div class="repo-name">Space-Invaders-Game</div>
                <div class="repo-desc">Classic arcade game with Pygame</div>
                <div class="repo-lang">Python</div>
            </div>
        `;
    }
    
    // Setup refresh button
    const refreshBtn = document.getElementById('refresh-github');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', () => {
            refreshBtn.querySelector('i').style.transform = 'rotate(360deg)';
            fetchGitHubStats();
            setTimeout(() => {
                refreshBtn.querySelector('i').style.transform = '';
            }, 1000);
        });
    }
    
    // Load stats on page load
    setTimeout(fetchGitHubStats, 1000);
});