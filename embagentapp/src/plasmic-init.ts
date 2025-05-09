import { initPlasmicLoader } from "@plasmicapp/loader-react";
export const PLASMIC = initPlasmicLoader({
  projects: [
    {
      id: "4faUrww8sm2NNAkuhdx7Sn",  // ID of a project you are using
      token: "2JbZLTeFjTXTQuTl2ThUl2DXdeP5kqbUJLUhZGiCdU9ppY4Uu9BWmmeQhpWY2pOeCTbLO2tU41q1LPq1oq7g"  // API token for that project
    }
  ],
  // Fetches the latest revisions, whether or not they were unpublished!
  // Disable for production to ensure you render only published changes.
  preview: true,
})