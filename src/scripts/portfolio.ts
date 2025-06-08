import { portfolioData } from '../data/portfolio';
import type { Project } from '../types/portfolio';

class PortfolioManager {
  private projectsContainer: HTMLElement | null;
  private loadMoreBtn: HTMLElement | null;
  private modal: HTMLElement | null;
  private currentFilter: string = 'all';
  private projectsPerPage: number = 6;
  private currentPage: number = 1;

  constructor() {
    this.projectsContainer = document.getElementById('projects-container');
    this.loadMoreBtn = document.getElementById('load-more-btn');
    this.modal = document.getElementById('project-modal');
    this.setupEventListeners();
    this.loadInitialProjects();
  }

  private setupEventListeners(): void {
    // Listen for filter changes
    window.addEventListener('portfolioFilter', ((e: CustomEvent) => {
      this.currentFilter = e.detail.filter;
      this.currentPage = 1;
      this.updateProjects();
    }) as EventListener);

    // Listen for project detail requests
    window.addEventListener('showProjectDetails', ((e: CustomEvent) => {
      const projectId = e.detail.projectId;
      this.showProjectDetails(projectId);
    }) as EventListener);

    // Load more button
    this.loadMoreBtn?.addEventListener('click', () => {
      this.currentPage++;
      this.updateProjects(true);
    });
  }

  private getAllProjects(): Project[] {
    if (this.currentFilter === 'all') {
      return Object.values(portfolioData).flatMap(category => category.projects);
    }
    return portfolioData[this.currentFilter]?.projects || [];
  }

  private loadInitialProjects(): void {
    this.updateProjects();
  }

  private updateProjects(append: boolean = false): void {
    if (!this.projectsContainer) return;

    const allProjects = this.getAllProjects();
    const startIndex = append ? (this.currentPage - 1) * this.projectsPerPage : 0;
    const endIndex = this.currentPage * this.projectsPerPage;
    const projectsToShow = allProjects.slice(0, endIndex);

    if (!append) {
      this.projectsContainer!.innerHTML = '';
    }

    projectsToShow.forEach(project => {
      const projectElement = this.createProjectElement(project);
      this.projectsContainer!.appendChild(projectElement);
    });

    // Update load more button visibility
    if (this.loadMoreBtn) {
      this.loadMoreBtn.style.display = 
        endIndex < allProjects.length ? 'block' : 'none';
    }
  }

  private createProjectElement(project: Project): HTMLElement {
    const article = document.createElement('article');
    article.className = 'project-card';
    article.setAttribute('data-category', project.category);

    article.innerHTML = `
      <div class="image-container">
        <img src="/images/${project.image}" alt="${project.title}" onerror="this.src='/images/placeholder.jpg'">
        <span class="category-label">${project.categoryLabel}</span>
      </div>
      <div class="content">
        <h3>${project.title}</h3>
        <p class="category">${project.categoryLabel}</p>
        <p class="description">${project.description}</p>
        <button class="details-btn" data-project="${project.id}">Ver detalles</button>
      </div>
    `;

    // Add click event listener for details button
    const detailsBtn = article.querySelector('.details-btn');
    detailsBtn?.addEventListener('click', () => {
      this.showProjectDetails(project.id);
    });

    return article;
  }

  private showProjectDetails(projectId: string): void {
    const project = this.findProject(projectId);
    if (!project || !this.modal) return;

    const modalContent = this.modal.querySelector('#modal-content');
    if (!modalContent) return;

    modalContent.innerHTML = `
      <div class="project-details">
        <img src="/images/${project.image}" alt="${project.title}" class="project-image">
        <div class="project-info">
          <h3>${project.title}</h3>
          <p>${project.fullDescription || project.description}</p>
          ${project.specs ? `
            <div class="project-specs">
              <h4>Especificaciones:</h4>
              <ul>
                ${project.specs.map(spec => `<li>${spec}</li>`).join('')}
              </ul>
            </div>
          ` : ''}
          ${project.completionDate ? `
            <p class="completion-date">
              <strong>Fecha de finalización:</strong> ${new Date(project.completionDate).toLocaleDateString()}
            </p>
          ` : ''}
          ${project.duration ? `
            <p class="duration">
              <strong>Duración del proyecto:</strong> ${project.duration}
            </p>
          ` : ''}
        </div>
      </div>
    `;

    this.modal.classList.add('active');
  }

  private findProject(projectId: string): Project | undefined {
    return Object.values(portfolioData)
      .flatMap(category => category.projects)
      .find(project => project.id === projectId);
  }
}

// Initialize portfolio manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new PortfolioManager();
});
