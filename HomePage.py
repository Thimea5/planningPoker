import tkinter as tk
from Rules import Rules

# Création de la classe qui permet d'afficher la page d'accueil
class HomePage:
    def __init__(self):
        # Paramètre de la fenêtre
        self.HomeWindow = tk.Tk()
        self.HomeWindow.title('Planning Poker')
        self.HomeWindow.geometry("800x600")
        self.HomeWindow.configure(bg="gray")

        # Composants de la fenêtre
        self.lb_title = tk.Label(self.HomeWindow, text="PLANNING POKER !")
        self.bt_startANewGame = tk.Button(self.HomeWindow, text="Nouvelle partie", command=self.clic)
        self.bt_rules = tk.Button(self.HomeWindow, text="Voir les règles", command=self.rules)

        # Ajout des composant à la fenêtre
        self.lb_title.pack()
        self.bt_startANewGame.pack()
        self.bt_rules.pack()

    def show(self):
        self.HomeWindow.mainloop()

    def clic(self):
        self.bt_startANewGame.config(text="bouton cliqué !")

    def close(self):
        self.HomeWindow.withdraw()

    def rules(self):
        self.close()
        rulesWindow = Rules(self.HomeWindow)
        rulesWindow.show()
