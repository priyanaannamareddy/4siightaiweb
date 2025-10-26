// Import Chart.js
import Chart from 'chart.js/auto';

// Initialize charts when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initCharts();
});

function initCharts() {
    // Revenue Growth Chart
    const revenueCtx = document.getElementById('revenueChart');
    if (revenueCtx) {
        new Chart(revenueCtx, {
            type: 'line',
            data: {
                labels: ['Q1 2023', 'Q2 2023', 'Q3 2023', 'Q4 2023', 'Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024'],
                datasets: [{
                    label: 'Revenue (₹ Lakhs)',
                    data: [25, 35, 45, 55, 70, 90, 120, 150],
                    borderColor: 'rgba(0, 229, 255, 1)',
                    backgroundColor: 'rgba(0, 229, 255, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: 'rgba(0, 229, 255, 1)',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 6,
                    pointHoverRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            color: 'rgba(255, 255, 255, 0.8)',
                            font: {
                                size: 14,
                                weight: '500'
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: 'rgba(255, 255, 255, 1)',
                        bodyColor: 'rgba(255, 255, 255, 0.9)',
                        borderColor: 'rgba(0, 229, 255, 0.5)',
                        borderWidth: 1
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.7)',
                            font: {
                                size: 12
                            }
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.7)',
                            font: {
                                size: 12
                            }
                        }
                    }
                },
                animation: {
                    duration: 2000,
                    easing: 'easeInOutQuart'
                }
            }
        });
    }

    // Growth Metrics Chart
    const growthCtx = document.getElementById('growthChart');
    if (growthCtx) {
        new Chart(growthCtx, {
            type: 'bar',
            data: {
                labels: ['Client Acquisition', 'Revenue Growth', 'Team Expansion', 'Project Completion', 'Innovation Index'],
                datasets: [{
                    label: '2024 Performance (%)',
                    data: [85, 167, 40, 95, 78],
                    backgroundColor: [
                        'rgba(0, 229, 255, 0.8)',
                        'rgba(0, 123, 255, 0.8)',
                        'rgba(0, 229, 255, 0.6)',
                        'rgba(0, 123, 255, 0.6)',
                        'rgba(0, 229, 255, 0.7)'
                    ],
                    borderColor: [
                        'rgba(0, 229, 255, 1)',
                        'rgba(0, 123, 255, 1)',
                        'rgba(0, 229, 255, 1)',
                        'rgba(0, 123, 255, 1)',
                        'rgba(0, 229, 255, 1)'
                    ],
                    borderWidth: 2,
                    borderRadius: 8,
                    borderSkipped: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            color: 'rgba(255, 255, 255, 0.8)',
                            font: {
                                size: 14,
                                weight: '500'
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: 'rgba(255, 255, 255, 1)',
                        bodyColor: 'rgba(255, 255, 255, 0.9)',
                        borderColor: 'rgba(0, 229, 255, 0.5)',
                        borderWidth: 1,
                        callbacks: {
                            label: function(context) {
                                return context.parsed.y + '% growth';
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.7)',
                            font: {
                                size: 12
                            },
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.7)',
                            font: {
                                size: 12
                            },
                            maxRotation: 45,
                            minRotation: 45
                        }
                    }
                },
                animation: {
                    duration: 2000,
                    easing: 'easeInOutQuart',
                    delay: function(context) {
                        return context.dataIndex * 200;
                    }
                }
            }
        });
    }

    // Add scroll-triggered chart animations
    const chartContainers = document.querySelectorAll('.chart-container');
    chartContainers.forEach((container, index) => {
        // Use Intersection Observer for scroll animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add a subtle glow effect when charts come into view
                    container.style.boxShadow = '0 0 30px rgba(0, 229, 255, 0.3)';
                    setTimeout(() => {
                        container.style.boxShadow = '0 0 15px rgba(0, 229, 255, 0.1)';
                    }, 1000);
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '0px 0px -50px 0px'
        });

        observer.observe(container);
    });
}

// Export for potential use in other modules
export { initCharts };
