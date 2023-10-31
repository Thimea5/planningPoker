import tkinter as tk
from Rules import Rules  # Assurez-vous que le nom de la classe est correctement importé

# Création de la classe qui permet d'afficher la page d'accueil
class HomePage:
    def __init__(self):
        # On crée la fenêtre
        self.window = tk.Tk()
        self.window.title('Planning Poker')
        self.window.geometry("800x600")

        # On crée les composants de cette fenêtre
        self.lb_title = tk.Label(self.window, text="PLANNING POKER !")
        self.bt_startANewGame = tk.Button(self.window, text="Nouvelle partie", command=self.clic)
        self.bt_rules = tk.Button(self.window, text="Voir les règles", command=self.rules)

        # Puis on ajoute les composants dans la fenêtre
        self.lb_title.pack()
        self.bt_startANewGame.pack()
        self.bt_rules.pack()

    def show(self):
        self.window.mainloop()

    def clic(self):
        self.bt_startANewGame.config(text="bouton cliqué !")

    def close(self):
        self.window.destroy()