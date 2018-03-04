x = [59.9783333333333 59.8883333333333 59.885 59.9166666666667 59.9083333333333 59.99 59.9583333333333 59.9366666666667 60 59.9383333333333 59.9016666666667];
y = [30.2166666666667 30.2183333333333 30.1666666666667 30.2633333333333 29.9366666666667 29.8583333333333 29.7966666666667 29.7883333333333 29.9383333333333 30.1283333333333 30.0866666666667];
z = [2.049999952 9.600000381 11.25 2.604444 13.80000019 13.89999962 15.69999981 6.309999943 12.5 15.42000008 35.20000076];
[XI, YI] = meshgrid(55:0.005:65, 25:0.005:35);
ZI = griddata(x, y, z, XI, YI, 'natural');
figure(2);
mesh(XI, YI, ZI), hold on, plot3(x, y, z, 'or')
title('������ ��������� ���������� � �� ��� 1982�.')