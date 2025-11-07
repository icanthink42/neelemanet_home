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
        title: 'Alpha Solve',
        link: 'https://github.com/icanthink42/alpha_solve',
        description: 'Inspired by my favorite calculator, Desmos, I wrote a plugin based calculator that allows the user to solve problems both symbolically and numerically. The calculator is split up into three main parts: the plugin manager, the python executor, and the project. Plugins are written in Python and executed with a WASM compiled cython interpreter so pythons powerful symbolic solving libraries can be utilized. I aim to make writing a plugin as simple as possible so people with expert math skills and minimal programming skills can contribute. <a href="https://github.com/icanthink42/alpha_solve/blob/main/docs/plugin-development.md" target="_blank">Plugin creation docs</a>',
        htmlTags: [
          '<iframe src="https://alphasolve.neelema.net/" width="100%" height="1200" frameborder="0" style="border:1px solid #e0e0e0;border-radius:4px;"></iframe>',
          '<img src="quadratic_alphasolve.png" alt="Alpha Solve Quadratic Example" style="width:100%; border:1px solid #e0e0e0; border-radius:4px;">',
          '<img src="diffeq_alphasolve.png" alt="Alpha Solve Differential Equation Example" style="width:100%; border:1px solid #e0e0e0; border-radius:4px;">',
          '<img src="idealgass_alphasolve.png" alt="Alpha Solve Ideal Gas Example" style="width:100%; border:1px solid #e0e0e0; border-radius:4px;">',
          '<img src="integral_alphasolve.png" alt="Alpha Solve Integral Example" style="width:100%; border:1px solid #e0e0e0; border-radius:4px;">'
        ]
      },
      {
        title: 'ICBM KKV Interceptor',
        link: 'https://github.com/icanthink42/kkv_interceptor',
        description: `At the end of my spaceflight mechanics class, we were tasked with doing an open-ended project. I decided to write a program in Rust to perform a Monte Carlo simulation of KKV ICBM interception. The program finds a range of possible interceptions and then performs an orbital mechanics simulation with added uncertainty in the burn to determine what burn minimizes the possibility of missing the target.`,
        htmlTags: [
          '<iframe src="https://icanthink42.github.io/spaceflight_mechanics_plots/plot1.html" width="100%" height="1200" frameborder="0" style="border:1px solid #e0e0e0;border-radius:4px;"></iframe>',
          '<iframe src="https://icanthink42.github.io/spaceflight_mechanics_plots/plot2.html" width="100%" height="1200" frameborder="0" style="border:1px solid #e0e0e0;border-radius:4px;"></iframe>',
          '<iframe src="https://icanthink42.github.io/spaceflight_mechanics_plots/plot3.html" width="100%" height="1200" frameborder="0" style="border:1px solid #e0e0e0;border-radius:4px;"></iframe>'
        ]
      },
      {
        title: 'Rust Generalsio Rewrite',
        link: 'https://github.com/icanthink42/generals',
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
        description: 'I talk with a lot of engineers who program often in Matlab and Python, but rarely venture into the land of languages like C or C++. To this crowd, pointers are a scary concept because they are seen as a low level concept that only exists on \'real\' programming languages. The reality of programming is that pointers always exist, and no matter how hard a language tries to hide them, you need to understand them to program. I wrote this program to attempt to demonstrate what a pointer is in a familiar context. I facetiously put \'Even Bad Languages Have Pointers\' in the title.',
        htmlTags: [
          '<iframe src="https://memory.neelema.net/" width="100%" height="1600" frameborder="0" style="border:1px solid #e0e0e0;border-radius:4px;"></iframe>'
        ]
      },
      {
        title: 'SSL Proxy',
        description: 'For years I have had trouble setting up SSL certificates on my small hobby projects. Each time I set up a new project I would have to set up a new SSL certificate and inevitably debug some aspect I forgot to setup. This proxy uses an ALB to encrypt and decrypt HTTPS traffic and send it to backend ec2 instances as HTTP traffic. The site you\'re on right now uses this proxy extensively. Simple static pages like this one do not route through the ALB and instead use the CERT of a hosting service like Vercel/GitHub Pages.',
        htmlTags: [
          '<img src="load_balancer.png" alt="Load Balancer Architecture" style="width:100%; border:1px solid #e0e0e0; border-radius:4px;">'
        ]
      },
      {
        title: 'A Flight Simulator Built in a Calculator',
        link: 'https://www.desmos.com/calculator/ixfvv2bode',
        description: 'I have been a huge fan of the calculator Desmos for a long time. I orignally started using in high school for homework, but since then I\'ve had a lot of fun playing around with all the quasi-programming features they\'ve added over the years. Back when I had a lot more free time I wrote this flight simulator using those features. I also wrote an <a href="https://www.desmos.com/calculator/t5pj25dz7g" target="_blank" rel="noopener">n-body simulator in Desmos</a>.',
        htmlTags: [
          '<iframe src="https://www.desmos.com/calculator/ixfvv2bode" width="100%" height="1200" frameborder="0" style="border:1px solid #e0e0e0;border-radius:4px;"></iframe>'
        ]
      },
      {
        title: 'Entropy Simulation',
        link: 'https://entropy.neelema.net',
        description: 'I came up with the idea for this small simulation when talking with my Dad about the nature of entropy. I was arguing that entropy is not a physical law but rather a statistical law. I wrote this simulation to demonstrate this idea. The simulation I wrote has very simple laws, praticles bounce off walls and each other, and particles move at constant velocity. When you click inside the simulation, you can add particles to the system. This decrases the specific entropy as the new particles have fewer degrees of freedom. Overtime the system naturally moves to a state of maximum entropy. The point I was trying to make about entropy is that is is a result of simple natrual laws that maximize the number of possible configurations of a system. Entropy is not a physical law, it is a statistical law.',
        htmlTags: [
          '<iframe src="https://entropy.neelema.net" width="100%" height="1200" frameborder="0" style="border:1px solid #e0e0e0;border-radius:4px;"></iframe>'
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
