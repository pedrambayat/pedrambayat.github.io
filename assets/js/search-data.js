// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "About",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-publications",
          title: "Publications",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-projects",
          title: "Projects",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "news-joined-the-ruella-lab-to-work-on-next-generation-car-t-cell-immunotherapies",
          title: 'Joined the Ruella Lab to work on next-generation CAR-T cell immunotherapies.',
          description: "",
          section: "News",},{id: "news-reference-free-cell-type-annotation-with-llm-agents-accepted-to-iclr-2026-machine-learning-for-genomics-explorations-mlgenx",
          title: 'Reference-free cell-type annotation with LLM agents accepted to ICLR 2026 Machine Learning for...',
          description: "",
          section: "News",},{id: "news-wrapped-up-my-summer-research-internship-at-genentech-biochemical-and-cellular-pharmacology",
          title: 'Wrapped up my summer research internship at Genentech Biochemical and Cellular Pharmacology.',
          description: "",
          section: "News",},{id: "news-accepted-into-the-2026-cohort-of-the-widjaja-engineering-entrepreneurship-fellows-program-at-penn",
          title: 'Accepted into the 2026 cohort of the Widjaja Engineering Entrepreneurship Fellows program at...',
          description: "",
          section: "News",},{id: "news-joined-the-goodman-lab-to-work-on-machine-learning-pipelines-for-protein-design",
          title: 'Joined the Goodman Lab to work on machine learning pipelines for protein design....',
          description: "",
          section: "News",},{id: "news-cart4-34-paper-published-in-science-translational-medicine",
          title: 'CART4-34 paper published in Science Translational Medicine!',
          description: "",
          section: "News",},{id: "projects-project-3-with-very-long-name",
          title: 'project 3 with very long name',
          description: "a project that redirects to another website",
          section: "Projects",handler: () => {
              window.location.href = "/projects/3_project.html";
            },},{id: "projects-project-4",
          title: 'project 4',
          description: "another without an image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/4_project.html";
            },},{id: "projects-project-5",
          title: 'project 5',
          description: "a project with a background image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/5_project.html";
            },},{id: "projects-project-6",
          title: 'project 6',
          description: "a project with no image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/6_project.html";
            },},{id: "projects-project-7",
          title: 'project 7',
          description: "with background image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/7_project.html";
            },},{id: "projects-project-8",
          title: 'project 8',
          description: "an other project with a background image and giscus comments",
          section: "Projects",handler: () => {
              window.location.href = "/projects/8_project.html";
            },},{id: "projects-project-9",
          title: 'project 9',
          description: "another project with an image 🎉",
          section: "Projects",handler: () => {
              window.location.href = "/projects/9_project.html";
            },},{id: "projects-simplified-phase-vocoder",
          title: 'Simplified Phase Vocoder',
          description: "Implementation of a simplified phase vocoder system in MATLAB to tune vocal input to the C Major scale. BE 3010 (Signals &amp; Systems).",
          section: "Projects",handler: () => {
              window.location.href = "/be3010/";
            },},{id: "projects-multi-modal-sequence-encoding-for-amps",
          title: 'Multi-modal Sequence Encoding for AMPs',
          description: "Benchmarking peptide sequence encoders and multi-modal transfer learning for out-of-distribution generalization. CIS 5200 (Machine Learning).",
          section: "Projects",handler: () => {
              window.location.href = "/amp/";
            },},{id: "projects-music-genre-classification",
          title: 'Music Genre Classification',
          description: "Classification model to predict the genre of a Spotify song based on its audio features. Final project for CIS 5450 (Big Data Analytics).",
          section: "Projects",handler: () => {
              window.location.href = "/music/";
            },},{id: "projects-cell-movement-and-morphology-analysis",
          title: 'Cell Movement and Morphology Analysis',
          description: "Tracking cells over using CV and microscopy images. ENGR 1050 (Scientific Computing).",
          section: "Projects",handler: () => {
              window.location.href = "/cells/";
            },},{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
