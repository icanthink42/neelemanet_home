import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

interface Project {
  title: string;
  link?: string;
  description: string;
  htmlTags?: string[];
  safeDescription?: SafeHtml;
  safeHtmlTags?: SafeHtml[];
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly siteName = 'Neelemanet';

  protected readonly projects: Project[];

  protected loadedIframes = new Map<string, boolean>();

  constructor(private sanitizer: DomSanitizer) {
    const rawProjects: Project[] = [
      {
        title: 'Neelemanet',
        description: 'You\'re currently on Neelemanet! I created neelemanet because for years I have had trouble setting up SSL certificates on my small hobby projects. Neelemanet uses an ALB to encrypt and decrypt HTTPS traffic and send it to backend ec2 instances as HTTP traffic. Simple static pages like this one do not route through the ALB and instead use the CERT of a hosting service like Vercel/GitHub Pages.',
        htmlTags: [
          '<img src="load_balancer.png" alt="Load Balancer Architecture" style="width:100%; border:1px solid #e0e0e0; border-radius:4px;">',
          '<iframe src="https://limbo.neelema.net" width="100%" height="600" frameborder="0" style="border:1px solid #e0e0e0;border-radius:4px;"></iframe>'
        ]
      },
      {
        title: 'ICBM KKV Interceptor',
        link: 'https://github.com/icanthink42/kkv_interceptor',
        description: `At the end of my spaceflight mechanics class we were tasked with doing an open-ended project. I decided to write a program in Rust to perform a Monte Carlo simulation of KKV ICBM interception. The program finds a range of possible interceptions and then performs an orbital mechanics simulation with added uncertainty in the burn to determine what burn minimizes the possibility of missing the target.`,
        htmlTags: [
          '<iframe src="https://icanthink42.github.io/spaceflight_mechanics_plots/plot1.html" width="100%" height="600" frameborder="0" style="border:1px solid #e0e0e0;border-radius:4px;"></iframe>',
          '<iframe src="https://icanthink42.github.io/spaceflight_mechanics_plots/plot2.html" width="100%" height="600" frameborder="0" style="border:1px solid #e0e0e0;border-radius:4px;"></iframe>',
          '<iframe src="https://icanthink42.github.io/spaceflight_mechanics_plots/plot3.html" width="100%" height="600" frameborder="0" style="border:1px solid #e0e0e0;border-radius:4px;"></iframe>'
        ]
      },
      {
        title: 'Rust Generalsio Rewrite',
        link: 'https://generals.neelema.net/',
        description: 'At Breeze, we would play a game called Generals.io after work on Fridays. I decided to rewrite the game entirely in Rust. Both the front end and backend are written in Rust in the same codebase. The backend compiles to x86 while the frontend compiles to WASM. This was a difficult setup due to the fact that they have a shared library that must compile to both x86 and WASM. This is obviously overkill for a simple game, but it was fun. I am a strong believer in defining data structures in a way that does not allow for invalid state to exist. The powerful Rust typing system along with keeping the frontend and backend both in the same codebase allowed me to do exactly that.',
        htmlTags: [
          '<img src="generals.png" alt="Rust Generals.io Screenshot" style="width:100%; border:1px solid #e0e0e0; border-radius:4px;">'
        ]
      },
      {
        title: 'Rocket Engine',
        link: 'https://rocketengine.neelema.net/',
        description: 'While taking a propulsion systems class and learning about the equation <img src="conv_div_eq.svg" alt="Converging-Diverging Equation" style="display:inline; height:2em; vertical-align:middle; margin:0 0.25em;"> which describes the reason for the diverging/converging nozzle of rocket engines, I decided to write a simple Quasi-1D numerical simulation of the equation. I\'ve known about the conceptual side of why rocket engines work for a while, so learning the mathematical side really motivated me to write a simulation.',
        htmlTags: [
          '<iframe src="https://rocketengine.neelema.net/" width="100%" height="600" frameborder="0" style="border:1px solid #e0e0e0;border-radius:4px;"></iframe>'
        ]
      },
      {
        title: 'Spring Mass Damper Frequency Domain Modeler',
        link: 'https://github.com/icanthink42/modcon_physics_solver',
          description: 'While taking Modeling and Control of Dynamical Systems (MODCON), I got tired of manually solving spring-mass-damper systems by hand so I wrote a tool to automatically solve them for me. I added support for both linear and radial systems as well as combinations of the two. I also added gears and custom forcing functions because I had a lot of questions that involved them on my homework.',
        htmlTags: [
          '<img src="spring_mass_damper.png" alt="Spring Mass Damper Frequency Domain Modeler Screenshot" style="width:100%; border:1px solid #e0e0e0; border-radius:4px;">',
          '<img src="spring_mass_damper_eq.svg" alt="Spring Mass Damper Equations of Motion" style="width:100%; border:1px solid #e0e0e0; border-radius:4px;">',
          '<img src="spring_mass_damper_laplace_eq.svg" alt="Spring Mass Damper Laplace Transform" style="width:100%; border:1px solid #e0e0e0; border-radius:4px;">'
        ]
      },
      {
        title: 'Javascript Memory Visualizer',
        link: 'https://memory.neelema.net/',
        description: 'I talk with a lot of engineers who program often in Matlab and Python but rarely venture into the land of languages like C or C++. To this crowd, pointers are a scary concept because they are seen as a low level concept that only exists on \'real\' programming languages. The reality of programming is that pointers always exist, and no matter how hard a language tries to hide them, you need to understand them to program. I wrote this program to attempt to demonstrate what a pointer is in a familiar context. I facetiously put \'Even Bad Languages Have Pointers\' in the title.',
        htmlTags: [
          '<iframe src="https://memory.neelema.net/" width="100%" height="1600" frameborder="0" style="border:1px solid #e0e0e0;border-radius:4px;"></iframe>'
        ]
      }
    ];

    this.projects = rawProjects.map(project => ({
      ...project,
      safeDescription: this.sanitizer.bypassSecurityTrustHtml(project.description),
      safeHtmlTags: project.htmlTags?.map(tag =>
        this.sanitizer.bypassSecurityTrustHtml(tag)
      )
    }));
  }

  scrollTags(direction: 'left' | 'right', projectIndex: number) {
    const container = document.getElementById(`tags-container-${projectIndex}`);
    if (!container) return;

    const scrollAmount = container.clientWidth;
    const targetScroll = direction === 'left'
      ? container.scrollLeft - scrollAmount
      : container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    });
  }

  isIframe(htmlTag: string): boolean {
    return htmlTag.trim().toLowerCase().startsWith('<iframe');
  }

  isIframeLoaded(projectIndex: number, tagIndex: number): boolean {
    return this.loadedIframes.get(`${projectIndex}-${tagIndex}`) || false;
  }

  loadIframe(projectIndex: number, tagIndex: number) {
    this.loadedIframes.set(`${projectIndex}-${tagIndex}`, true);
  }

  getIframeSrc(htmlTag: string): string {
    const match = htmlTag.match(/src="([^"]+)"/);
    return match ? match[1] : '';
  }
}
