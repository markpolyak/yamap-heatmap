%---- Коорд-ты левого верхнего угла ----
y1 = 60.239214;
x1 = 29.103127;

%---- Коорд-ты пр. ниж. угла ----
y2 = 59.835767;
x2 = 30.375137;
 

D = [60.0833333333333 29.4333333333333 1.24000000000000; 
      59.9766666666667 29.6150000000000 3.31999993300000; 
      60.0833333333333 29.7283333333333 9.19999980900000;
      60.0666666666667 29.1333333333333 6.59999990500000;
      59.9600000000000 29.9816666666667 10.6499996200000; 
      59.9900000000000 29.8583333333333 8.89999961900000; 
      59.9583333333333 29.7966666666667 8.07999992400000; 
      59.9366666666667 29.7883333333333 8.72999954200000; 
      60 29.9383333333333 4.61999988600000; 
      59.9383333333333 30.1283333333333 6.07999992400000; 
      59.9016666666667 30.0866666666667 20; 
      59.8850000000000 30.1666666666667 11.9300003100000; 
      59.9783333333333 30.2166666666667 0.899999976000000; 
      59.9666666666667 30.2183333333333 0.0500000010000000; 
      59.8883333333333 30.2183333333333 2.67000007600000; 
      59.9166666666667 30.2633333333333 18.4200000000000; 
      60.1150000000000 29.8733333333333 0.0200000000000000];
 
n = 6000;
k = 6000;

 
stepX = (x2 - x1) / n;
stepY = (y2 - y1) / k;
 
%---- Массив коорд-т точек сетки по X ----
mX = [];
%---- Массив коорд-т точек сетки по Y ----
mY = [];
 
for i = 1:n
    for j = 1:k
        mX(i) = x1 + i * stepX;
        mY(j) = y1 + j * stepY; 
    end
end


% create random field with autocorrelation
[X,Y] = meshgrid(mX,mY);

% sample the field
x = D(:,2);
y = D(:,1);
z = D(:,3);

% plot the random field
%subplot(2,2,1)
%imagesc(X(1,:),Y(:,1),Z); axis xy
%hold on
%plot(x,y,'.k')
%title('random field with sampling locations')

% calculate the sample variogram
v = variogram([x y],z,'plotit',false,'maxdist',100);
% and fit a spherical variogram
figure('Name','KRIGE');
[dum,dum,dum,vstruct] = variogramfit(v.distance,v.val,[],[],[],'model','stable');
title('variogram')


% now use the sampled locations in a kriging
[Zhat,Zvar] = kriging(vstruct,x,y,z,X,Y);
figure('Name','KRIGE');
clmp=colorGradient([1 1 1], [0 0.75 0.2], 64);
imagesc(X(1,:),Y(:,1), Zhat); axis xy
colormap(clmp);
colorbar;%('TickLabels',{'0','3.5','7','10.5','14','17.5','21','24.5','28','31.5','35'})
hold on

[img, map, alphachannel] = imread('big map.png');
imagesc([29.103127,30.375137], [59.835767,60.239214], img, 'AlphaData', alphachannel);

plot(D(:, 2), D(:, 1), 'or')
%plot(x,y,'.k')
%title('kriging predictions')

figure('Name','KRIGE');
contour(X,Y,Zvar);
title('kriging variance')