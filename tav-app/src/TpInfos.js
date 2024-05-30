const tp6parameters = [
    {
        name: 'nb_iter',
        type: 'int',
        description: 'Nombre d\'itérations',
        default: 300
    },
    {
        name: 'mu_gvf',
        type: 'float',
        description: 'Coefficient de régularisation',
        default: 2
    },
    {
        name: 'lambda_gvf',
        type: 'float',
        description: 'Pas de temps',
        default: 0.01
    }
	
]

export const tp6 = {
    number: 6,
    parameters: tp6parameters,  
    title: "Contours Actifs",
    smallDescription: "Détection de contours actifs sur une image",
    imagePreview: 'imgs/tp6.jpeg',
    videoPreview: '',
    fullDescription : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.',
}
