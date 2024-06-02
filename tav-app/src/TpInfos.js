import Dropzone from 'react-dropzone';
import Tp5DropZone from './Tp5DropZone';

// ------TPs IMAGES--------
//--------TP5--------

const tp5parameters = [
    {
        name: 't',
        type: 'int',
        description: 'Voisinage d\'un pixel de taille (2t+1) x (2t+1)',
        default: 4,
        min: 0,
        max: 20
    },
    {
        name: 'T',
        type: 'int',
        description: 'Fenetre de recherche de taille (2T+1) x (2T+1)',
        default: 50,
        min: 0,
        max: 200,
    }
    
];

const tp5AdditionalParameters = [
    {
        name: 'D',
        description: 'Masque',
    }
  ];

export const tp5 = {
    number: 5,
    parameters: tp5parameters,  
    title: "Rapieceage de texture",
    smallDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.",
    videoPreview: 'videos/tp5.mp4',
    fullDescription : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.',
    dropzone: (setSelectedFile, setPreview, setAdditionalParameters) => (
      <Tp5DropZone 
        setSelectedFile={setSelectedFile}
        setPreview={setPreview}
        setAdditionalParameters={setAdditionalParameters}
      />
    ),
    additionalParameters: tp5AdditionalParameters
};



// ------TP6--------
const tp6parameters = [
    {
        name: 'nb_iter',
        type: 'int',
        description: 'Nombre d\'itérations',
        default: 300,
        min: 0,
        max: 1000
    },
    {
        name: 'mu_gvf',
        type: 'float',
        description: 'Coefficient de régularisation',
        default: 2,
        min: 0,
        max: 10
    },
    {
        name: 'lambda_gvf',
        type: 'float',
        description: 'Pas de temps',
        default: 0.01,
        min: 0,
        max: 1,
    }
	
]

const tp6DropZone = (setSelectedFile, setPreview) => (
    <Dropzone 
      onDrop={acceptedFiles => {
        setSelectedFile(acceptedFiles[0]);
        setPreview(URL.createObjectURL(acceptedFiles[0]));
      }}
    >
      {({ getRootProps, getInputProps }) => (
        <div {...getRootProps()} className="dropzone-card">
          <input {...getInputProps()} />
          <p>Drag & drop an image here, or click to select one</p>
        </div>
      )}
    </Dropzone>
  );

export const tp6 = {
    number: 6,
    parameters: tp6parameters,  
    title: "Contours Actifs",
    smallDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.",
    videoPreview: 'videos/tp6.mp4',
    fullDescription : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.',
    dropzone: tp6DropZone
}


// ------TP8--------
const tp8parameters = [
    {
        name: 'nb_iter',
        type: 'int',
        description: 'Nombre d\'itérations',
        default: 1000,
        min: 0,
        max: 3000
    },
    {
        name: 'epsilon',
        type: 'float',
        description: 'Terme de régularisation',
        default: 0.5,
        min: 0,
        max: 1
    },
    {
        name: 'eta',
        type: 'float',
        description: 'Paramètre de coupure de fréquence',
        default: 0.05,
        min: 0,
        max: 1,
    },
    {
        name: 'mu_p',
        type: 'float',
        description: 'Coefficient de régularisation (mu_p = mu/K)',
        default: 5000,
        min: 0,
        max: 10,
    },
    {
        name: 'gamma',
        type: 'float',
        description: 'Pas de descente de gradient',
        default: 0.00003,
        min: 0,
        max: 0.001,
    }
  
]

const tp8DropZone = (setSelectedFile, setPreview) => (
    <Dropzone 
      onDrop={acceptedFiles => {
        setSelectedFile(acceptedFiles[0]);
        setPreview(URL.createObjectURL(acceptedFiles[0]));
      }}
    >
      {({ getRootProps, getInputProps }) => (
        <div {...getRootProps()} className="dropzone-card">
          <input {...getInputProps()} />
          <p>Drag & drop an image here, or click to select one</p>
        </div>
      )}
    </Dropzone>
  );

export const tp8 = {
    number: 8,
    parameters: tp8parameters,  
    title: "Débruitage Hilbert-TV",
    smallDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.",
    videoPreview: 'videos/tp8.mp4',
    fullDescription : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.',
    dropzone: tp8DropZone
}



// ------TPs AUDIO--------

// ------TP11--------
const tp11parameters = [
    {
        name: 'nb_iter',
        type: 'int',
        description: 'Nombre d\'itérations',
        default: 1000,
        min: 0,
        max: 3000
    },

  
]