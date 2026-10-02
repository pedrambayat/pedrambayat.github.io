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
          section: "News",},{id: "news-joined-the-goodman-lab-to-work-on-machine-learning-for-protein-design",
          title: 'Joined the Goodman Lab to work on machine learning for protein design.',
          description: "",
          section: "News",},{id: "news-cart4-34-paper-published-in-science-translational-medicine",
          title: 'CART4-34 paper published in Science Translational Medicine!',
          description: "",
          section: "News",},{id: "news-started-my-ml-research-internship-at-tahoe-therapeutics",
          title: 'Started my ML research internship at Tahoe Therapeutics.',
          description: "",
          section: "News",},{id: "projects-simplified-phase-vocoder",
          title: 'Simplified Phase Vocoder',
          description: "Implementation of a simplified phase vocoder system in MATLAB to tune vocal input to the C Major scale. BE 3010 (Signals &amp; Systems).",
          section: "Projects",handler: () => {
              window.location.href = "/be3010/";
            },},{id: "projects-bio-sentry-agent-guardrails",
          title: 'Bio-Sentry: Agent Guardrails',
          description: "A hackathon prototype connecting biological sequence screening to policy enforcement at an AI agent&#39;s tool-call boundary.",
          section: "Projects",handler: () => {
              window.location.href = "/bio-sentry-agent/";
            },},{id: "projects-cart4-34-manufacturing",
          title: 'CART4-34 Manufacturing',
          description: "Improving lentiviral transduction for a selective CAR T cell therapy, with reagent screening and follow-up cell expansion.",
          section: "Projects",handler: () => {
              window.location.href = "/cart434-transduction/";
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
            },},{id: "projects-emg-controlled-communication",
          title: 'EMG-Controlled Communication',
          description: "Translating muscle contractions into Morse code with analog EMG circuitry, adaptive signal processing, and a Python game interface. BE 3100 (MAD Lab).",
          section: "Projects",handler: () => {
              window.location.href = "/emg-communication/";
            },},{id: "projects-cell-movement-and-morphology-analysis",
          title: 'Cell Movement and Morphology Analysis',
          description: "Tracking cell movement and changes in shape using microscopy images and computer vision. ENGR 1050 (Scientific Computing).",
          section: "Projects",handler: () => {
              window.location.href = "/cells/";
            },},{id: "projects-computational-car-t-design-for-melanoma",
          title: 'Computational CAR-T Design for Melanoma',
          description: "Designing TYRP1-binding miniproteins within a broader CAR-T cell engineering and delivery proposal. BE 3060 (Cell Engineering).",
          section: "Projects",handler: () => {
              window.location.href = "/melanoma-car-t-design/";
            },},{id: "projects-peptide-binder-design",
          title: 'Peptide Binder Design',
          description: "Designing IκBα-binding peptides for an induced-proximity concept within a Duchenne muscular dystrophy design challenge. BE 3060 (Cell Engineering).",
          section: "Projects",handler: () => {
              window.location.href = "/peptide-binder-design/";
            },},{id: "projects-learning-to-walk-with-ppo",
          title: 'Learning to Walk with PPO',
          description: "Implementing PPO and a standing-to-walking curriculum for simulated locomotion. ESE 6500 (Learning in Robotics).",
          section: "Projects",handler: () => {
              window.location.href = "/ppo-walking/";
            },},{id: "projects-llm-cell-type-annotation",
          title: 'LLM Cell-Type Annotation',
          description: "Benchmarking LLM agents for reference-free cell-type annotation, with explicit checks for workflow failures and hallucinations.",
          section: "Projects",handler: () => {
              window.location.href = "/reference-free-cell-annotation/";
            },},{id: "projects-arduino-spectrophotometer",
          title: 'Arduino Spectrophotometer',
          description: "An Arduino optical measurement instrument with calibration-based concentration estimation, an LCD interface, and a Ferrari F1-inspired enclosure.",
          section: "Projects",handler: () => {
              window.location.href = "/spectrophotometer/";
            },},{id: "projects-state-estimation-and-mapping",
          title: 'State Estimation and Mapping',
          description: "Estimating orientation from inertial sensors and building LiDAR maps with quaternion and particle filters. ESE 6500 (Learning in Robotics).",
          section: "Projects",handler: () => {
              window.location.href = "/state-estimation-mapping/";
            },},{id: "projects-vhh-design-and-evaluation",
          title: 'VHH Design and Evaluation',
          description: "Designing VHH candidates for CAR T cells and testing whether their predicted confidence and binding surfaces survive re-evaluation.",
          section: "Projects",handler: () => {
              window.location.href = "/vhh-binder-design/";
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
