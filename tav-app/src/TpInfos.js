import Dropzone from 'react-dropzone';
import Tp5DropZone from './Tp5DropZone';
import Tp10DropZone from './Tp10DropZone';
import Tp11Zone from './Tp11Zone';

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
    title: "Rapiéçage de texture",
    smallDescription: "L'inpainting par rapiéçage est une technique qui comble les parties manquantes d'une image en utilisant des morceaux provenant d'autres parties de l'image. Cette méthode permet de restaurer l'image en préservant les textures environnantes.",
    videoPreview: 'videos/tp5.mp4',
    fullDescription : "La méthode d'inpainting par rapiéçage (patch-based inpainting) consiste à combler les zones manquantes d'une image en utilisant des morceaux (patchs) extraits d'autres parties de l'image. En sélectionnant et en intégrant intelligemment ces patchs, l'algorithme permet de restaurer l'image de manière cohérente et réaliste, en préservant les textures et les structures visuelles environnantes.",
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
          <p>Glisser-déposer une image ici, ou cliquer pour en sélectionner une</p>
        </div>
      )}
    </Dropzone>
  );

export const tp6 = {
    number: 6,
    parameters: tp6parameters,  
    title: "Contours Actifs",
    smallDescription: "Un contour actif est un modèle de courbe déformable qui évolue au cours du temps pour se fixer sur les contours, ce qui peut aider l’utilisateur à segmenter les objets visibles dans une image.",
    videoPreview: 'videos/tp6.mp4',
    fullDescription : "Les contours actifs, notamment avec la diffusion vers les contours, visent à améliorer les résultats en ajustant la force externe pour attirer le contour actif vers les contours visibles dans l'image. Cette technique utilise un modèle de force externe tel que le GVF (Gradient Vector Flow), qui est calculé en résolvant les équations de diffusion généralisées. En itérant à travers ces équations, le champ de force externe GVF peut être calculé et affiché pour guider efficacement le contour actif vers les contours souhaités dans l'image.",
    dropzone: tp6DropZone
}


// ------TP8--------
const tp8parameters = [
    {
        name: 'nb_iter',
        type: 'int',
        description: 'Nombre d\'itérations',
        default: 500,
        min: 0,
        max: 1000
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
          <p>Glisser-déposer une image ici, ou cliquer pour en sélectionner une</p>
        </div>
      )}
    </Dropzone>
  );

export const tp8 = {
    number: 8,
    parameters: tp8parameters,  
    title: "Débruitage Hilbert-TV",
    smallDescription: "Le modèle TV-Hilbert décompose les images en leur structure et leur texture en utilisant un filtre passe-bas suivi d'un schéma de descente de gradient pour une séparation précise.",
    videoPreview: 'videos/tp8.mp4',
    fullDescription : "Le modèle TV-Hilbert offre une approche mixte pour séparer la structure et la texture d'une image. En utilisant un filtre passe-bas et en passant dans le domaine fréquenciel par une transformation de Fourier, il contraint les spectres de l'image pour une meilleure adaptation au problème. Pour finir, il permet, grace  à un schéma de descente de gradient,  de séparer efficacement la structure et la texture de l'image.",
    dropzone: tp8DropZone
}



// ------TPs AUDIO--------


// ------TP10-------
const tp10Parameters = [
  {
    name:'m',
    type: 'int',
    description: 'les m coefficients de Fourier les plus élevés à conserver',
    default:100,
    min:1,
    max:1000
  },
  {
    name:'df',
    type: 'float',
    description: 'coeficient de decimation (intervalle entre chaque ligne/colonne)',
    default:2,
    min:1,
    max:10
  },
]


export const tp10 = {
    number: 10,
    type: 'audio',
    title: "Compréssion de  signaux audionumériques",
    smallDescription: "Grâce à un sonagramme, il est possible de retrouver quelles fréquences contribuent le plus à la reconstruction d'un signal audio à un instant donné. Il est donc facile de réaliser une compression naîve du signal",
    imagePreview: 'imgs/tp10.png',
    fullDescription : "Grâce a un sonagramme, il est possible de retrouver quelles fréquences contribuent le plus à la reconstruction d'un signal audio à un instant donné. Il est donc possible de conserver uniquement une faible proportion des coefficients de Fourier les plus élevés, afin de réaliser une compression ndu signal. Ajouté a cela, nous pouvons y ajouter une strategie de décimation pou atteindre un taux de compression optimal",
    dropzone: (a,b,c,parameters) => (
      <Tp10DropZone 
      tpParameters={parameters}
      />),
    parameters: tp10Parameters
}


// ------TP11--------
const tp11extraParameters = [
    {
        name: 'numero_morceau',
        type: 'int',
        description: 'Numéro du morceau',
    },
    {
        name: 'debut_extrait',
        type: 'float',
        description: 'Début de l\'extrait',
    },
    {
        name: 'duree_extrait',
        type: 'float',
        description: 'Durée de l\'extrait',
    }
  ];

export const tp11 = {
    number: 11,
    type: 'audio',
    title: "Reconnaissance musicale",
    smallDescription: "La réalisation d’un système de reconnaissance musicale nécessite de définir une empreinte qui puisse caractériser chaque enregistrement musical sans ambiguïté. Pour cela on peut utiliser les pics spectraux pour créer une empreinte sonore propre à chaque enregistrement musical",
    imagePreview: 'imgs/tp11.jpg',
    fullDescription : "La réalisation d’un système de reconnaissance musicale nécessite de définir une empreinte qui puisse caractériser chaque enregistrement musical sans ambiguïté. Pour cela on peut utiliser les pics spectraux pour créer une empreinte sonore propre à chaque enregistrement musical. Pour augmenter le pourcentage de bonnes reconnaissances, on peut ajouter une condition sur la cohérence entre les instants d’apparition des paires de pics de l’extrait et ceux du morceau présent dans la base.",
    additionalParameters: tp11extraParameters,
    dropzone: (l,i,setAdditionalParameters) => (
      <Tp11Zone 
      setAdditionalParameters={setAdditionalParameters}
      />),
    parameters: []
}


