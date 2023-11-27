import tkinter as tk

#Création de la classe qui permet de lancer une partie
class Game:
    def __init__(self, homepage):
        self.homepage_window = homepage
        #On créer la fenêtre
        self.gameWindow = tk.Tk()
        self.gameWindow.title('PLANNING POKER')
        #self.gameWindow.state('zoomed')
        self.gameWindow.configure(bg="gray")


        #Ajouter un évenement lorsque l'on clique sur la croix pour fermer la page
        self.gameWindow.protocol("WM_DELETE_WINDOW", self.close)
        self.lb_gameTitle = tk.Label(self.gameWindow, text="Planning Poker")

        #On créer les composants de cette fenêtre
        self.lb_gameTitle = tk.Label(self.gameWindow, text="Lancer une partie")
        self.lb_nbPlayers = tk.Label(self.gameWindow, text="Nombre de joueurs : ")
        self.data_nbPlayers = tk.Listbox(self.gameWindow, [1,2,3,4,5])
        self.data_nbPlayers.current(0)

        self.lb_difficulty = tk.Label(self.gameWindow, text="Difficulté")

        #Puis on ajoute les composants dans la fenêtre
        self.lb_gameTitle.pack()
        self.lb_nbPlayers.pack()
        self.data_nbPlayers.pack()

    def show(self):
        self.gameWindow.mainloop()

    def close(self):
        self.homepage_window.deiconify()
        self.gameWindow.destroy()
        