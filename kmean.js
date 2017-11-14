function kmeans(data, k=2){

  // Calcul de l'histogramme pondéré
  let histoPondere = Array();
  data.reduce((a,b,c) => histoPondere[c] = a+b, data[0]);

  // Centroids placés aleatoirement

  let centroids = Array.from({length: k}, a => (Math.random()*data.length)|0).sort((a, b) => a-b);


  // Attribution de chaque tranche de l'histo a un centroid
  let label = data.map((a,b) => a = closestValue(b, centroids));


  //Boucle de kmean ! S'arrete au bout de 100 itérations ou quand les pts bougent plus
  for (let x = 0; x<100;x++){
    console.log(centroids);
    console.log(label);
  // Calcul de la moyenne de chaque pt apparenant a un centroid
  // Afin de définir les nouveaux centroids
    let centromean = Array(k).fill(0);
    let centronb = Array(k).fill(0);

    for (let i = 0; i<data.length; i++) {
      for (let j = 0; j<k; j++) {
        if (label[i] == j) {centromean[j] += data[i]*i; centronb[j] += data[i];}
      }
    }

    // Nouveaux centroids
    centroids = centromean.map((a,b) => (a / centronb[b])|0);

    // Nouveaux labels
    let newlabel = data.map((a,b) => a = closestValue(b, centroids));

    if(label.every((a,b) => a === newlabel[b])) {break;}
    else{label = newlabel;}
  }
}

function closestValue(x, tableau) {
  min = Number.MAX_SAFE_INTEGER;
  index = -1;
  for (let i=0; i < tableau.length; i++) {
    let abs =  x-tableau[i] > 0 ? x-tableau[i] : - (x-tableau[i]);
    if (abs < min) {
      min = abs;
      index = i;
    }
  }
  return index;
}

histo = [0,2,4,5,18,180,2,8,9,172,3,19,8,0,2,1,0,0];
console.log(histo);
kmeans(histo, 2);

/* pseudo code kmean :

Initialisation : On choisi k nombre de cluster
pour un thresholding bilevel, k = 2
On initialise donc 2 "centroides" aléatoirement placés
dans l'intervalle de l'histogramme (entre 0 et 255 par exemple)


Boucle :

Pour chaque pixel on cherche quel est le centroid le plus proche :
On peut regarder pour chaque intervalle de l'histogramme
On replace les centroides par la moyenne des pixels appartenant a son groupe
Si aucun pixel n'a changé de groupe on arrete la boucle
*/
