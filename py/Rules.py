import tkinter as tk

#Création de la classe qui permet d'afficher les règles
class Rules:
    def __init__(self, homepage):
        self.homepage_window = homepage
        #On créer la fenêtre
        self.rulesWindow = tk.Tk()
        self.rulesWindow.title('Règlement')
        #self.rulesWindow.state('zoomed')

        #Ajouter un évenement lorsque l'on clique sur la croix pour fermer la page
        self.rulesWindow.protocol("WM_DELETE_WINDOW", self.close)

        self.rulesWindow.attributes('-topmost', True)
        
        self.rulesWindow.after(1, lambda: self.rulesWindow.focus_force())


        #On créer les composants de cette fenêtre
        self.lb_rulesTitle = tk.Label(self.rulesWindow, font = ("default", 20), foreground="red",text="REGLEMENTS")
        self.lb_rulesTxt = tk.Label(self.rulesWindow, font = ("default", 10), wraplength = 400, text="Le planning poker permet d'estimer la difficulté des différentes tâches à effectuer dans un projet.\n\nLe product Owner doit présenter la tâche ou la fonctionnalité à estimer.\n\nChaque joueur reçoit un esemble de cartes numérotées (suite de fibo).\n\nChacun choisit secrètement une carte représentant son estimation de la complexité de la tache.\n\nLes cartes sont révélées en même temps.\n\n Les joueurs ayant la difficulté la plus et la moins élévée discutes et donne leur point de vu.\n\nLe processus se repète jusqu'à ce que tous les joueurs obtiennent la même estimation.\n")

        self.lb_easyRulesTitle = tk.Label(self.rulesWindow, font = ("default", 15),text = "Règles simples")
        self.lb_easyRulesTxt = tk.Label(self.rulesWindow, wraplength = 400, text="Pas de limite de temps")

        self.lb_midRulesTitle = tk.Label(self.rulesWindow, font = ("default", 15), text = "Règles moyennement strictes")
        self.lb_midRulesTxt = tk.Label(self.rulesWindow, wraplength = 400, text="Chaque joueur possède 1 minute pour jouer un tour.")

        self.lb_strictRulesTitle = tk.Label(self.rulesWindow, font = ("default", 15), text = "Règles strictes")
        self.lb_strictRulesTxt = tk.Label(self.rulesWindow, wraplength = 400, text="Chaque joueur possède 15 secondes pour jouer un tour. S'il ne joue pas, il est exclu de la partie")

        #Puis on ajoute les composants dans la fenêtre
        self.lb_rulesTitle.pack()
        self.lb_rulesTxt.pack()

        self.lb_easyRulesTitle.pack()
        self.lb_easyRulesTxt.pack()

        self.lb_midRulesTitle.pack()
        self.lb_midRulesTxt.pack()

        self.lb_strictRulesTitle.pack()
        self.lb_strictRulesTxt.pack()

        #Placement des widgets
        rightSide = tk.Frame(self.rulesWindow)
        rightSide.grid(row=0, column = 1)

        rightSide = tk.Frame(self.rulesWindow)
        rightSide.grid(row=0, column = 1)

    def show(self):
        self.rulesWindow.mainloop()

    def close(self):
        self.rulesWindow.destroy()
        