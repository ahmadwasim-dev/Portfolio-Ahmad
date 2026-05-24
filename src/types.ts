export interface ProfileTypes {
  name: string;
  location: string;
  resumeUrl:string;
  locationLink: string;
  description: string;
  summary: string;
avatarUrl: {
    public_id: string;
    url: string;
  };
  skills: string[];
}


export interface ContactTypes {
  email: string;
  tel: string;
  social: {
    name: string;
    url: string;
    icon: {
    public_id: string;
    url: string;
  };
    navbar: boolean;
  }[];
}

export interface WorkType {
  company: string;
  link: string;
  location: string;
  logoUrl: {
    public_id: string;
    url: string;
  };
  start: string; // previously Date
  end: string;
  description: string;
}

export type WorkTypes = WorkType[];





export interface EducationType{
    school: string;
    link: string;
    degree: string;
    logoUrl: {
      public_id: string;
      url: string;
    };
    start: string;
    end: string;
  }


  export type EducationTypes=EducationType[]


  export interface HackathonsType{
    title: string;
    link: string;
    dates: string;
    location: string;
    description?: string;
    image: {
      public_id: string;
      url: string;
    }
  }

  export type HackathonsTypes=HackathonsType[]



  export interface ProjectType{
    title: string
    link: string
    dates: string
   
    description: string
    technologies: string[]
    links: {
      type: string // Reverted to 'type'
      link: string // Reverted to 'link'
    }[]
    video: {
      public_id: string
      url: string
      duration: number
      width: number
      height: number
      format: string
      bytes: number
    }
    caseStudy?: {
      // New optional case study object
      youtubeVideoUrl?: string
      projectOverview?: string
      keyFeatures?: string[]
      databaseArchitectureImage?: {
        public_id: string
        url: string
      }
        systemArchitectureImage?: {
        public_id: string
        url: string
      }
      systemArchitecture?: { title: string; description: string }[]
      challengesAndSolutions?: { title: string; challenge: string; solution: string }[]
    }
  }


   export type ProjectTypes=ProjectType[]