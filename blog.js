// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Category filtering functionality
    const categoryLinks = document.querySelectorAll('.category-list a');
    const blogPosts = document.querySelectorAll('.blog-post');
    
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            categoryLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Get selected category
            const selectedCategory = this.getAttribute('data-category');
            
            // Filter blog posts
            blogPosts.forEach(post => {
                if (selectedCategory === 'all' || post.getAttribute('data-category') === selectedCategory) {
                    post.style.display = 'block';
                    // Add fade-in animation
                    post.style.opacity = '0';
                    post.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        post.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                        post.style.opacity = '1';
                        post.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    post.style.display = 'none';
                }
            });
        });
    });
    
    // Newsletter form functionality
    const newsletterForm = document.getElementById('newsletter-form');
    const newsletterMessage = document.getElementById('newsletter-message');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNewsletterMessage('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate subscription
            const submitBtn = this.querySelector('button');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Subscribing...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showNewsletterMessage('Thank you for subscribing! Check your email for confirmation.', 'success');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
    
    function showNewsletterMessage(message, type) {
        newsletterMessage.textContent = message;
        newsletterMessage.className = `newsletter-message ${type} show`;
        
        // Hide message after 5 seconds
        setTimeout(() => {
            newsletterMessage.classList.remove('show');
        }, 5000);
    }
    
    // Tag filtering functionality
    const tags = document.querySelectorAll('.tag');
    
    tags.forEach(tag => {
        tag.addEventListener('click', function() {
            const tagText = this.textContent.trim();
            
            // Filter posts by tag
            blogPosts.forEach(post => {
                const postTags = Array.from(post.querySelectorAll('.post-tags .tag')).map(t => t.textContent.trim());
                
                if (postTags.includes(tagText)) {
                    post.style.display = 'block';
                    post.style.opacity = '0';
                    post.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        post.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                        post.style.opacity = '1';
                        post.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    post.style.display = 'none';
                }
            });
            
            // Update active category to show filtered results
            categoryLinks.forEach(l => l.classList.remove('active'));
            document.querySelector('[data-category="all"]').classList.add('active');
            
            // Scroll to top of blog posts
            document.querySelector('.blog-posts').scrollIntoView({ behavior: 'smooth' });
        });
    });
    
    // Read more links functionality
    const readMoreLinks = document.querySelectorAll('.read-more');
    
    readMoreLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // In a real application, this would navigate to the full blog post
            // For now, we'll show a message
            const postTitle = this.closest('.blog-post').querySelector('h2').textContent;
            showNewsletterMessage(`Opening full post: "${postTitle}"`, 'success');
        });
    });
    
    // Search functionality (bonus feature)
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search blog posts...';
    searchInput.style.cssText = `
        width: 100%;
        padding: 0.75rem 1rem;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 8px;
        color: #e4e4e7;
        font-family: 'Inter', sans-serif;
        font-size: 1rem;
        margin-bottom: 1rem;
        transition: all 0.3s ease;
    `;
    
    // Add search input to sidebar
    const firstSidebarSection = document.querySelector('.sidebar-section');
    if (firstSidebarSection) {
        firstSidebarSection.insertBefore(searchInput, firstSidebarSection.querySelector('h3').nextSibling);
        
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            blogPosts.forEach(post => {
                const title = post.querySelector('h2').textContent.toLowerCase();
                const content = post.querySelector('.post-content').textContent.toLowerCase();
                const tags = Array.from(post.querySelectorAll('.post-tags .tag')).map(t => t.textContent.toLowerCase());
                
                const matchesSearch = title.includes(searchTerm) || 
                                   content.includes(searchTerm) || 
                                   tags.some(tag => tag.includes(searchTerm));
                
                if (matchesSearch || searchTerm === '') {
                    post.style.display = 'block';
                    post.style.opacity = '0';
                    post.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        post.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                        post.style.opacity = '1';
                        post.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    post.style.display = 'none';
                }
            });
            
            // Update active category
            if (searchTerm !== '') {
                categoryLinks.forEach(l => l.classList.remove('active'));
            } else {
                document.querySelector('[data-category="all"]').classList.add('active');
            }
        });
    }
    
    // Smooth scroll for recent posts links
    const recentPostsLinks = document.querySelectorAll('.recent-posts a');
    
    recentPostsLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetPost = document.getElementById(targetId);
            
            if (targetPost) {
                // Make sure the post is visible
                targetPost.style.display = 'block';
                
                // Scroll to the post
                targetPost.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'center'
                });
                
                // Highlight the post temporarily
                targetPost.style.border = '2px solid #667eea';
                targetPost.style.boxShadow = '0 0 20px rgba(102, 126, 234, 0.5)';
                
                setTimeout(() => {
                    targetPost.style.border = '1px solid rgba(255, 255, 255, 0.1)';
                    targetPost.style.boxShadow = '';
                }, 2000);
            }
        });
    });
    
    // Add scroll effect to header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.style.background = '#ffffff';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = '#ffffff';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // Add typing effect to blog hero title
    const blogHeroTitle = document.querySelector('#blog-hero h2');
    if (blogHeroTitle) {
        const originalText = blogHeroTitle.textContent;
        blogHeroTitle.textContent = '';
        let charIndex = 0;
        
        function typeWriter() {
            if (charIndex < originalText.length) {
                blogHeroTitle.textContent += originalText.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 100);
            }
        }
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 500);
    }
});
