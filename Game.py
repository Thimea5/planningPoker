import tkinter as tk

#Création de la classe qui permet de lancer une partie
class Game:
    def __init__(self, homepage):
        self.homepage_window = homepage
        #On créer la fenêtre
        self.gameWindow = tk.Tk()
        self.gameWindow.title('PLANNING POKER')
        self.gameWindow.state('zoomed')

        #Ajouter un évenement lorsque l'on clique sur la croix pour fermer la page
        self.gameWindow.protocol("WM_DELETE_WINDOW", self.close)
        self.lb_gameTitle = tk.Label(self.gameWindow, text="Planning Poker")

        #On créer les composants de cette fenêtre
        self.lb_GameTitle = tk.Label(self.rulesWindow, text="REGLEMENTS")

        #Puis on ajoute les composants dans la fenêtre
        self.lb_rulesTitle.pack()

    def show(self):
        self.gameWindow.mainloop()

    def close(self):
        self.homepage_window.deiconify()
        self.gameWindow.destroy()
        