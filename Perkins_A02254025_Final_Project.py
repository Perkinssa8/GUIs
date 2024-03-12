import numpy as np
import matplotlib.pyplot as plt
from matplotlib import cm


file = open('Fnal Project Radial.csv', 'wb')
file1 = open('Tissue.csv', 'wb')
file2 = open('Final Project Axial.csv', 'wb')
file.write('Ozisik\r\n'.encode())
file1.write('Tissue\r\n'.encode())
file2.write('Axial\r\n'.encode())

def brach (T_a):
    # define variables
    time = 3 #seconds
    r_inner = .02 #meters
    thickness = 500 * 10**-6
    asl_thick = .4 # see page 2121 in Wu for a 2s breathing period
    r_outer = r_inner + thickness
    L = .25 # meters
    k_air = 2.68*10**-2 #J/m/s/K
    k = 0.62 # W/m/k
    d = 2.7 * 10 **-5 #m^2/s
    c_p_air = 1080 #J/kg/k
    c_p = 4180 # J/kg/k Frontiers
    rho = 993 #kg/m^3
    alpha = k/(rho*c_p)
    alpha = 3.8 * 10 ** -4
    print("alpha for tissue in the lumen", alpha)
    alpha_1 = 1.43 *10 **-7 #thermal diffusivity of layer 1 (water properties J/m/s/K)
    k_asl = 0.6
    Lat = 2.41*10**6 #latent heat vaporization J/kg
    u = .3 # m/s
    dr = 5 * 10** -4/10
    dt = dr**2/(2*alpha) # time steps at 0.1 s
    dr_airway = 0.2/10
    dz = .25/20
    T_b = 37 # T of the body tissue further out than 500
    T_initial = 22 # Steady state room temperature
    print(r_outer,dr)
    np.set_printoptions(precision=15, threshold=30, edgeitems=11, suppress=True) # set print options

    # empty matrix array)
    T_ozisik = np.zeros([2,int(thickness/dr+1), int(L/dz)]) # IDEA: instead of using a definit planes, just use two planes and pass one to the other
    Tissue = np.zeros([2,int(thickness/dr+1), int(L/dz)])
    Tissue2 = np.zeros([1,int(thickness/dr+1), int(L/dz)])
    # 
    Air = np.zeros([2,int(r_inner/dr_airway + 1),int(L/dz)])
    T = np.zeros([2,int(r_inner/dr_airway + 1),int(L/dz)])
    ax, fig = plt.subplots()
    print(len(T_ozisik[0,:,0]), len(T_ozisik[0,0,:]))

    # write file def
    def writefile(i):
        file.write(str('Ozisik\r\nAt time {:.7f}\r\n'.format(i*dt)).encode())
        np.savetxt(file, np.atleast_2d(T_ozisik[0,:,:]),fmt='%.4f', delimiter=', ', newline = '\r\n')
        file1.write(str('Tissue\r\nAt time {:.7f}\r\n'.format(i*dt)).encode())
        np.savetxt(file1, np.atleast_2d(Tissue[0,:,:]),fmt='%.4f', delimiter=', ', newline = '\r\n')
        file2.write(str("Appended list of Tissue profiles\r").encode())
        np.savetxt(file2, np.atleast_2d(Tissue2),fmt='%.4f', delimiter=', ', newline = '\r\n')
        file.write('\r'.encode())
        file1.write('\r'.encode())

    # initialize the temperatures assuming equilibrium at room temperature (steady state case)
    for j in range(11):
        radius = r_inner + j * dr
        T_ozisik[:,j,:] = ((T_b-T_initial)/np.log(r_outer/r_inner))*np.log(radius/r_inner) + T_initial
    Tissue = T_ozisik.copy()
    Tissue2 = T_ozisik[0,:,:].copy()
    writefile(0)
    print(alpha*dt/(dr**2))
        #writefile(i)
        
    # main for loop for center finite difference(when introduced to cold air)
    Tissue[0,0,:] = T_a
    for i in range(1, 4):#int((time/dt + 1))): # total time steps
        interval = dt*i
        for j in range(1,10):
            r_i = r_outer - j * dr
            # Tissue[1,j+1,k] = dt*alpha*(1/(dr) * ((Tissue[0,j+1,k]- 2 * Tissue[0,j,k] + Tissue[0,j-1,k])/dr)) + Tissue[0,j,k]
            # Tissue[1,j+1,:] = dt*alpha*(1/(dr) * ((Tissue[0,j+1,:]- 2 * Tissue[0,j,:] + Tissue[0,j-1,:])/dr)) + Tissue[0,j,:]
            # Tissue[1,j+1,:] = dt*alpha*(1/(dr) * ((Tissue[0,j+1,:]- 2 * Tissue[0,j,:] + Tissue[0,j-1,:])/dr)) + Tissue[0,j,:]    
            #Tissue[1, j] = Tissue[0, j] + alpha * dt / dr**2 * (r_i) * (Tissue[0, j+1] - 2 * Tissue[0, j] + Tissue[0, j-1])   # CHAT EQUATION, BUT SWITCHED I AND J BC time, space 
            Tissue[1, j] = Tissue[0, j] +(alpha*dt)/dr**2 *(Tissue[0, j-1] - 2* Tissue[0,j] + Tissue[0,j+1]) + (((alpha*dt)/(2*dr))/r_i) * (Tissue[0,j+1] - Tissue[0, j-1]) # FROM MY NOTES AT THE BOTTOM
            #Tissue[i, j + 1] = Tissue[i, j] + alpha * dt / dr**2 * (r_inner + i * dr) * (Tissue[i + 1, j] - 2 * Tissue[i, j] + Tissue[i - 1, j])        
        Tissue2 = np.vstack((Tissue2, Tissue[1,:,:]))
            #for k in range(10):
                # ozisik equation seems the most correct: its boundary conditions are T r= r_outer, heat flux on r_inner (generated from T of air), and constant T of Tissue[:,0] (first column)
                # one concern: this equation is not dependent on time
                #T_ozisik[1,j,k+1] = (dz**2)*((1/dr**2)*(1 - 1/(2*j))*T_ozisik[0,j-1,k] - 2*T_ozisik[0,j,k] + (1 + (1/(2*j))*T_ozisik[0,j+1,k])) + 2*T_ozisik[0,j,k] - T_ozisik[0,j,k-1] # Ozisik
                #T_ozisik[1,j,k+1] = (dz**2)*((1/dr**2)*(1 - 1/(2*j))*T_ozisik[0,j-1,k] - 2*T_ozisik[0,j,k] + (1 + (1/(2*j))*T_ozisik[0,j+1,k])) + 2*T_ozisik[0,j,k] - T_ozisik[0,j,k-1] # Ozisik
                
                # My derivation and chat's respectively: boundary conditions are constant T_a at z=0, T_f at z=L, axially symmetry, and T at r=r_inner (generated from T_osizik[-1,:])
                #Air[i,j,k + 1] = Air[i,j,k] + (dt/(rho*c_p))*(-rho*u*(Air[i,j+1,k] - Air[i,j-1,k])/(2*dz)+k*(Air[i,j,k+1]-2*Air[i,j,k] + Air[i,j,k-1])/(dz**2))
                #T[i,j, k + 1] = T[i,j, k] + (dt / (rho * c_p)) * (u * (T[i,j - 1, k] - T[i,j + 1, k]) / (2 * dz) +k * (T[i,j - 1, k] - 2 * T[i,j, k] + T[i,j + 1, k]) / dz**2)
                #T_ozisik[i,-1,k] = Air[i,0,k] # !!!!!!The boundary condition at r= r_inner: need to adjust!! this could potentially be a heat flux
        Tissue[1,0,:] = T_a
        Tissue[0,:,:] = Tissue[1,:,:]
        
        # assign the end of the axial air component as the boundary condition for the subsequent step
        # if i % int(time/(dt*4)) == 0:
        if i % 1 == 0:
            writefile(i)

    plot = False
    plot_lin = False

    if plot_lin == True:
        for i in range(4):
            y_axe = [Tissue[i,l,0] for l in range(11)]
            x_axe = [l*dr for l in range(11)]
            fig = plt.figure(1)
            ax = plt.plot(x_axe,y_axe)
        plt.show()
        
    # create a plot
    if plot == True:
        for k in range(0,8):
            fig = plt.figure()
            xaxis = ([])# initialize distance along the x axis (columns, i) to plot it
            yaxis = ([])# initialize distance along the y axis (rows, j) to plot it
            for i in range(int(z/dz+1)): #initialize x-axis (j,columns) for plot
                xaxis.append(round(i*dz,4))
            for j in range(int(thickness/dr+1)): #initialize y-axis (i,rows) for plot
                yaxis.append(round(j*dr,4))
            ax = plt.axes(projection = '3d')
            ax.set_box_aspect(aspect = (1,1,1)) #scale axes to match ranges
            # https://stackoverflow.com/questions/30223161/matplotlib-mplot3d-how-to-increase-the-size-of-an-axis-stretch-in-a-3d-plo#
            xaxis,yaxis=np.meshgrid(xaxis,yaxis)
            z=Tissue[k,:,:]
            surf = ax.plot_surface(xaxis,yaxis,z, rstride=1, cstride=1, cmap=cm.jet,linewidth=0, antialiased=False)
            # https://matplotlib.org/stable/tutorials/colors/colormaps.html
            fig.colorbar(surf)
            ax.set_xlabel('x (meters)')
            ax.set_ylabel('y (meters)')
            ax.set_zlabel('Concentration (g/L)')
            plt.tight_layout()
            fig.suptitle("titles"[k])
            plt.tight_layout()

if __name__ == "__main__":
    brach(8)

#Things to do:
# experiment with larger values to see if the initial conditions work
# Look at other examples with 2d and a time dimension to see how elements transfer in the i loop etc.
# Look at how T at the wall is dependent on the flux
# find h the Heat transfer coefficient for convection
# Look at Snicker's candy bar to see how convections is used as a heat flux 
# Decide if you want to use the latent heat of vaporization in calculating a heat response
# How does heat transfer in the air since it is a fluid? Probably conduction, convection, maybe the equation we have written from chat
# conduct more research on the above topic either in chat or with scholarly articles
# get function working with only a constant temperature at the boundary
# then at the air
# then axially