/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/GUIForms/JFrame.java to edit this template
 */
package projectmanagment;

import arbre.ArbreController;
import arbre.ArbreTache;
import arbre.ArbreVue;
import arbre.ModificationArbreButtons;
import arbre.NoeudVue;
import java.awt.Color;
import java.awt.Cursor;
import java.awt.EventQueue;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.util.Calendar;
import java.util.Date;
import java.util.HashSet;
import javax.swing.ImageIcon;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.border.EmptyBorder;
import javax.swing.plaf.basic.BasicButtonUI;

import projectmanagment.Account;
import projectmanagment.ControleurVueGlobale;
import projectmanagment.Etat;
import projectmanagment.Home;
import projectmanagment.Login;
import projectmanagment.Membre;
import projectmanagment.Project;
import projectmanagment.Projet;
import projectmanagment.Tache;
import projectmanagment.VueGlobale;

/**
 *
 * @author Hay Info
 */
public class ProjectView extends javax.swing.JFrame {
    private int mouseX, mouseY;
    private Calendar calendar = Calendar.getInstance();
        //private calendar.set(2023, Calendar.MAY, 30);
    private Date dateFin = calendar.getTime();
    private Projet projet;
    /**
     * Creates new form ProjectView
     */
    public ProjectView(Projet projet) {
    	this.projet = projet;
        initComponents();
        projectName.setText(projet.getName());
        minimize.setBorder(new EmptyBorder(0, 0, 0, 0));
        minimize.setUI(new BasicButtonUI());
        minimize.setCursor(new Cursor(Cursor.HAND_CURSOR));
        minimize.setBackground(Color.white);
        minimize.addMouseListener( new MouseListener(){
            @Override
            public void mouseClicked(MouseEvent e) {
            }

            @Override
            public void mousePressed(MouseEvent e) {
            }

            @Override
            public void mouseReleased(MouseEvent e) {
            }

            @Override
            public void mouseEntered(MouseEvent e) {
                minimize.setForeground((new Color(40, 47, 57)));
            }

            @Override
            public void mouseExited(MouseEvent e) {
                minimize.setForeground((new Color(87, 78, 213)));
            }

        }
        );
        
        exit.setBorder(new EmptyBorder(0, 0, 0, 0));
        exit.setUI(new BasicButtonUI());
        exit.setCursor(new Cursor(Cursor.HAND_CURSOR));
        exit.addMouseListener( new MouseListener(){
            @Override
            public void mouseClicked(MouseEvent e) {
            }

            @Override
            public void mousePressed(MouseEvent e) {
            }

            @Override
            public void mouseReleased(MouseEvent e) {
            }

            @Override
            public void mouseEntered(MouseEvent e) {
                exit.setForeground(new Color(97, 96, 97));
                exit.setIcon(new ImageIcon(getClass().getResource("/icons/logout_gray.png")));
            }

            @Override
            public void mouseExited(MouseEvent e) {
                exit.setForeground(Color.WHITE);
                exit.setIcon(new ImageIcon(getClass().getResource("/icons/logout_white.png")));
            }

        }
        );
        
        JButton[] btns1 = {globalView, tree, members};
        for(JButton btn : btns1){
            btn.setCursor(new Cursor(Cursor.HAND_CURSOR));
            btn.setUI(new BasicButtonUI());
            btn.addMouseListener( new MouseListener(){
                    @Override
                    public void mouseClicked(MouseEvent e) {
                    }

                    @Override
                    public void mousePressed(MouseEvent e) {
                    }

                    @Override
                    public void mouseReleased(MouseEvent e) {
                    }

                    @Override
                    public void mouseEntered(MouseEvent e) {
                        btn.setBackground(new Color(88,101,242));
                    }

                    @Override
                    public void mouseExited(MouseEvent e) {
                        btn.setBackground(new Color(218,215,215));
                    }

                }

                );
        }
        
        JButton[] btns = {account, signOut, overview};
        for(JButton btn : btns){
            btn.setCursor(new Cursor(Cursor.HAND_CURSOR));
            btn.setUI(new BasicButtonUI());
            btn.addMouseListener( new MouseListener(){
                    @Override
                    public void mouseClicked(MouseEvent e) {
                    }

                    @Override
                    public void mousePressed(MouseEvent e) {
                    }

                    @Override
                    public void mouseReleased(MouseEvent e) {
                    }

                    @Override
                    public void mouseEntered(MouseEvent e) {
                        btn.setBackground(new Color(97, 96, 97));
                    }

                    @Override
                    public void mouseExited(MouseEvent e) {
                        btn.setBackground(new Color(88, 101, 242));
                    }

                }

                );
        }
    }

    /**
     * This method is called from within the constructor to initialize the form.
     * WARNING: Do NOT modify this code. The content of this method is always
     * regenerated by the Form Editor.
     */
    @SuppressWarnings("unchecked")
    // <editor-fold defaultstate="collapsed" desc="Generated Code">//GEN-BEGIN:initComponents
    private void initComponents() {

        rootProject = new javax.swing.JPanel();
        header = new javax.swing.JPanel();
        jLabel2 = new javax.swing.JLabel();
        jPanel9 = new javax.swing.JPanel();
        minimize = new javax.swing.JButton();
        jTextField1 = new javax.swing.JTextField();
        jLabel3 = new javax.swing.JLabel();
        menuBar = new javax.swing.JPanel();
        jLabel12 = new javax.swing.JLabel();
        exit = new javax.swing.JButton();
        overview = new javax.swing.JButton();
        projects = new javax.swing.JButton();
        account = new javax.swing.JButton();
        signOut = new javax.swing.JButton();
        projectName = new javax.swing.JLabel();
        members = new javax.swing.JButton();
        globalView = new javax.swing.JButton();
        tree = new javax.swing.JButton();

        setDefaultCloseOperation(javax.swing.WindowConstants.EXIT_ON_CLOSE);
        setLocationByPlatform(true);
        setUndecorated(true);

        rootProject.setBackground(new java.awt.Color(255, 255, 255));
        rootProject.setBorder(javax.swing.BorderFactory.createMatteBorder(1, 0, 1, 1, new java.awt.Color(88, 101, 242)));

        header.setBackground(new java.awt.Color(255, 255, 255));
        header.setPreferredSize(new java.awt.Dimension(920, 60));

        jLabel2.setIcon(new javax.swing.ImageIcon(getClass().getResource("/icons/icons8_search_20px.png"))); // NOI18N

        jPanel9.setOpaque(false);
        jPanel9.addMouseMotionListener(new java.awt.event.MouseMotionAdapter() {
            public void mouseDragged(java.awt.event.MouseEvent evt) {
                jPanel9MouseDragged(evt);
            }
        });
        jPanel9.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mousePressed(java.awt.event.MouseEvent evt) {
                jPanel9MousePressed(evt);
            }
        });
        jPanel9.setLayout(new org.netbeans.lib.awtextra.AbsoluteLayout());

        minimize.setFont(new java.awt.Font("SansSerif", 1, 14)); // NOI18N
        minimize.setForeground(new java.awt.Color(87, 78, 213));
        minimize.setIcon(new javax.swing.ImageIcon(getClass().getResource("/icons/icons8_subtract_15px_1.png"))); // NOI18N
        minimize.setBorder(null);
        minimize.setCursor(new java.awt.Cursor(java.awt.Cursor.DEFAULT_CURSOR));
        minimize.setHorizontalTextPosition(javax.swing.SwingConstants.CENTER);
        minimize.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseClicked(java.awt.event.MouseEvent evt) {
                minimizeMouseClicked(evt);
            }
        });
        jPanel9.add(minimize, new org.netbeans.lib.awtextra.AbsoluteConstraints(840, 2, 20, 20));

        jTextField1.setForeground(new java.awt.Color(204, 204, 204));
        jTextField1.setText("Search");
        jTextField1.setBorder(javax.swing.BorderFactory.createMatteBorder(0, 0, 1, 0, new java.awt.Color(153, 153, 153)));
        jTextField1.setPreferredSize(new java.awt.Dimension(64, 35));

        jLabel3.setIcon(new javax.swing.ImageIcon(getClass().getResource("/icons/icons8_male_user_30px_2.png"))); // NOI18N

        javax.swing.GroupLayout headerLayout = new javax.swing.GroupLayout(header);
        header.setLayout(headerLayout);
        headerLayout.setHorizontalGroup(
            headerLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(headerLayout.createSequentialGroup()
                .addGap(25, 25, 25)
                .addComponent(jLabel2)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addComponent(jTextField1, javax.swing.GroupLayout.PREFERRED_SIZE, 338, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGap(416, 416, 416)
                .addComponent(jLabel3)
                .addGap(0, 0, Short.MAX_VALUE))
            .addComponent(jPanel9, javax.swing.GroupLayout.DEFAULT_SIZE, 870, Short.MAX_VALUE)
        );
        headerLayout.setVerticalGroup(
            headerLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(headerLayout.createSequentialGroup()
                .addGroup(headerLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addGroup(headerLayout.createSequentialGroup()
                        .addComponent(jPanel9, javax.swing.GroupLayout.PREFERRED_SIZE, 20, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addGap(0, 0, 0)
                        .addGroup(headerLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.CENTER)
                            .addComponent(jLabel2)
                            .addComponent(jTextField1, javax.swing.GroupLayout.PREFERRED_SIZE, 40, javax.swing.GroupLayout.PREFERRED_SIZE)))
                    .addGroup(headerLayout.createSequentialGroup()
                        .addGap(26, 26, 26)
                        .addComponent(jLabel3)))
                .addContainerGap(18, Short.MAX_VALUE))
        );

        menuBar.setBackground(new java.awt.Color(88, 101, 242));
        menuBar.setPreferredSize(new java.awt.Dimension(240, 680));

        jLabel12.setHorizontalAlignment(javax.swing.SwingConstants.CENTER);
        jLabel12.setIcon(new javax.swing.ImageIcon(getClass().getResource("/icons/icons8_team_builder_90px_1.png"))); // NOI18N

        exit.setBackground(new java.awt.Color(87, 100, 241));
        exit.setFont(new java.awt.Font("SansSerinew Object [][] {\n"
        		+ "                {\"JavaProject\", \"KhadijaAkkar\"}\n"
        		+ "            },\n"
        		+ "            new String [] {\n"
        		+ "                \"Name\", \"Creator\"\n"
        		+ "            }\n"
        		+ "        ) {f", 1, 14)); // NOI18N
        exit.setForeground(new java.awt.Color(255, 255, 255));
        exit.setIcon(new javax.swing.ImageIcon(getClass().getResource("/icons/logout_white.png"))); // NOI18N
        exit.setText("Exite");
        exit.setBorder(null);
        exit.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                exitActionPerformed(evt);
            }
        });

        overview.setBackground(new java.awt.Color(88, 101, 242));
        overview.setFont(new java.awt.Font("SansSerif", 1, 18)); // NOI18N
        overview.setForeground(new java.awt.Color(255, 255, 255));
        overview.setIcon(new javax.swing.ImageIcon(getClass().getResource("/icons/icons8_overview_30px_9.png"))); // NOI18N
        overview.setText("Overview");
        overview.setBorder(javax.swing.BorderFactory.createEmptyBorder(1, 20, 1, 1));
        overview.setCursor(new java.awt.Cursor(java.awt.Cursor.DEFAULT_CURSOR));
        overview.setHorizontalAlignment(javax.swing.SwingConstants.LEFT);
        overview.setIconTextGap(15);
        overview.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                overviewActionPerformed(evt);
            }
        });

        projects.setBackground(new java.awt.Color(88, 101, 242));
        projects.setFont(new java.awt.Font("SansSerif", 1, 18)); // NOI18N
        projects.setForeground(new java.awt.Color(255, 255, 255));
        projects.setIcon(new javax.swing.ImageIcon(getClass().getResource("/icons/icons8_project_30px.png"))); // NOI18N
        projects.setText("Projects");
        projects.setBorder(javax.swing.BorderFactory.createEmptyBorder(1, 20, 1, 1));
        projects.setCursor(new java.awt.Cursor(java.awt.Cursor.DEFAULT_CURSOR));
        projects.setHorizontalAlignment(javax.swing.SwingConstants.LEFT);
        projects.setIconTextGap(15);
        projects.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                projectsActionPerformed(evt);
            }
        });

        account.setBackground(new java.awt.Color(88, 101, 242));
        account.setFont(new java.awt.Font("SansSerif", 1, 18)); // NOI18N
        account.setForeground(new java.awt.Color(255, 255, 255));
        account.setIcon(new javax.swing.ImageIcon(getClass().getResource("/icons/icons8_search_account_30px.png"))); // NOI18N
        account.setText("Account");
        account.setBorder(javax.swing.BorderFactory.createEmptyBorder(1, 20, 1, 1));
        account.setCursor(new java.awt.Cursor(java.awt.Cursor.DEFAULT_CURSOR));
        account.setHorizontalAlignment(javax.swing.SwingConstants.LEFT);
        account.setIconTextGap(15);
        account.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                accountActionPerformed(evt);
            }
        });

        signOut.setBackground(new java.awt.Color(88, 101, 242));
        signOut.setFont(new java.awt.Font("SansSerif", 1, 18)); // NOI18N
        signOut.setForeground(new java.awt.Color(255, 255, 255));
        signOut.setIcon(new javax.swing.ImageIcon(getClass().getResource("/icons/icons8_logout_30px.png"))); // NOI18N
        signOut.setText("Sign out");
        signOut.setBorder(javax.swing.BorderFactory.createEmptyBorder(1, 20, 1, 1));
        signOut.setCursor(new java.awt.Cursor(java.awt.Cursor.DEFAULT_CURSOR));
        signOut.setHorizontalAlignment(javax.swing.SwingConstants.LEFT);
        signOut.setIconTextGap(15);
        signOut.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                signOutActionPerformed(evt);
            }
        });

        javax.swing.GroupLayout menuBarLayout = new javax.swing.GroupLayout(menuBar);
        menuBar.setLayout(menuBarLayout);
        menuBarLayout.setHorizontalGroup(
            menuBarLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addComponent(jLabel12, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
            .addComponent(account, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
            .addComponent(signOut, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
            .addGroup(menuBarLayout.createSequentialGroup()
                .addContainerGap()
                .addComponent(exit)
                .addContainerGap(javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
            .addComponent(overview, javax.swing.GroupLayout.DEFAULT_SIZE, 240, Short.MAX_VALUE)
            .addComponent(projects, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
        );
        menuBarLayout.setVerticalGroup(
            menuBarLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(menuBarLayout.createSequentialGroup()
                .addGap(0, 0, 0)
                .addComponent(jLabel12)
                .addGap(49, 49, 49)
                .addComponent(overview, javax.swing.GroupLayout.PREFERRED_SIZE, 45, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGap(0, 0, 0)
                .addComponent(projects, javax.swing.GroupLayout.PREFERRED_SIZE, 45, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGap(0, 0, 0)
                .addComponent(account, javax.swing.GroupLayout.PREFERRED_SIZE, 45, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGap(208, 208, 208)
                .addComponent(signOut, javax.swing.GroupLayout.PREFERRED_SIZE, 45, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, 117, Short.MAX_VALUE)
                .addComponent(exit)
                .addContainerGap())
        );

        projectName.setBackground(new java.awt.Color(226, 226, 226));
        projectName.setFont(new java.awt.Font("SansSerif", 1, 24)); // NOI18N
        projectName.setForeground(new java.awt.Color(0, 95, 142));
        projectName.setHorizontalAlignment(javax.swing.SwingConstants.CENTER);
        projectName.setBorder(new javax.swing.border.SoftBevelBorder(javax.swing.border.BevelBorder.RAISED, new java.awt.Color(204, 204, 204), new java.awt.Color(204, 204, 204), new java.awt.Color(204, 204, 204), new java.awt.Color(204, 204, 204)));

        members.setBackground(new java.awt.Color(218, 215, 215));
        members.setText("Members");
        members.setBorder(javax.swing.BorderFactory.createMatteBorder(2, 2, 0, 0, new java.awt.Color(51, 102, 255)));
        members.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                membersActionPerformed(evt);
            }
        });

        globalView.setBackground(new java.awt.Color(218, 215, 215));
        globalView.setText("Global View");
        globalView.setBorder(javax.swing.BorderFactory.createMatteBorder(2, 2, 0, 0, new java.awt.Color(51, 102, 255)));
        globalView.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                globalViewActionPerformed(evt);
            }
        });

        tree.setBackground(new java.awt.Color(218, 215, 215));
        tree.setText("Tree");
        tree.setBorder(javax.swing.BorderFactory.createMatteBorder(2, 2, 0, 0, new java.awt.Color(51, 102, 255)));
        tree.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseClicked(java.awt.event.MouseEvent evt) {
                treeMouseClicked(evt);
            }
        });
        tree.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                treeActionPerformed(evt);
            }
        });

        javax.swing.GroupLayout rootProjectLayout = new javax.swing.GroupLayout(rootProject);
        rootProject.setLayout(rootProjectLayout);
        rootProjectLayout.setHorizontalGroup(
            rootProjectLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(rootProjectLayout.createSequentialGroup()
                .addComponent(menuBar, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGroup(rootProjectLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addComponent(header, javax.swing.GroupLayout.DEFAULT_SIZE, 870, Short.MAX_VALUE)
                    .addGroup(rootProjectLayout.createSequentialGroup()
                        .addGap(52, 52, 52)
                        .addComponent(projectName, javax.swing.GroupLayout.PREFERRED_SIZE, 258, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addGap(0, 0, Short.MAX_VALUE))
                    .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, rootProjectLayout.createSequentialGroup()
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                        .addGroup(rootProjectLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING, false)
                            .addComponent(globalView, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                            .addComponent(members, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                            .addComponent(tree, javax.swing.GroupLayout.PREFERRED_SIZE, 520, javax.swing.GroupLayout.PREFERRED_SIZE))
                        .addGap(174, 174, 174))))
        );
        rootProjectLayout.setVerticalGroup(
            rootProjectLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(rootProjectLayout.createSequentialGroup()
                .addGroup(rootProjectLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addGroup(rootProjectLayout.createSequentialGroup()
                        .addComponent(header, javax.swing.GroupLayout.PREFERRED_SIZE, 78, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addGap(18, 18, 18)
                        .addComponent(projectName, javax.swing.GroupLayout.PREFERRED_SIZE, 43, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addGap(91, 91, 91)
                        .addComponent(globalView, javax.swing.GroupLayout.PREFERRED_SIZE, 32, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addGap(18, 18, 18)
                        .addComponent(members, javax.swing.GroupLayout.PREFERRED_SIZE, 32, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addGap(18, 18, 18)
                        .addComponent(tree, javax.swing.GroupLayout.PREFERRED_SIZE, 32, javax.swing.GroupLayout.PREFERRED_SIZE))
                    .addComponent(menuBar, javax.swing.GroupLayout.PREFERRED_SIZE, 670, javax.swing.GroupLayout.PREFERRED_SIZE))
                .addGap(0, 0, Short.MAX_VALUE))
        );

        getContentPane().add(rootProject, java.awt.BorderLayout.CENTER);

        pack();
        setLocationRelativeTo(null);
    }// </editor-fold>//GEN-END:initComponents

    private void minimizeMouseClicked(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_minimizeMouseClicked
        // TODO add your handling code here:
        this.setState(this.ICONIFIED);
    }//GEN-LAST:event_minimizeMouseClicked

    private void jPanel9MouseDragged(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_jPanel9MouseDragged
        this.setLocation(this.getX() + evt.getX() - this.mouseX, this.getY() + evt.getY() - this.mouseY);
    }//GEN-LAST:event_jPanel9MouseDragged

    private void jPanel9MousePressed(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_jPanel9MousePressed
        mouseX = evt.getX();
        mouseY = evt.getY();
    }//GEN-LAST:event_jPanel9MousePressed

    private void exitActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_exitActionPerformed
        // TODO add your handling code here:
    	Sauvegarde.sauvegarder(projet);
        dispose();
    }//GEN-LAST:event_exitActionPerformed

    private void overviewActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_overviewActionPerformed
        // TODO add your handling code here:
        Home home = new Home();
        home.setVisible(true);
        this.setVisible(false);
    }//GEN-LAST:event_overviewActionPerformed

    private void accountActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_accountActionPerformed
        // TODO add your handling code here:
        Account acnt = new Account();
        acnt.setVisible(true);
        this.setVisible(false);
    }//GEN-LAST:event_accountActionPerformed

    private void signOutActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_signOutActionPerformed
        // TODO add your handling code here:
        Login login = new Login();
        login.setVisible(true);
        this.setVisible(false);
    }//GEN-LAST:event_signOutActionPerformed

    private void membersActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_membersActionPerformed
//    	Calendar calendar = Calendar.getInstance();
//        calendar.set(2023, Calendar.MAY, 30);
//        Date dateFin = calendar.getTime();
//        Projet projet = new Projet("Projet TOB", new Tache("Projet", "", new Date(), new Date(), Etat.EnCours, (Tache) null), new HashSet<Membre>(), "Description du projet", new Date(), dateFin);
//        Membre xavier = new Membre("Xavier");
//        xavier.assignerTache(new Tache("Mettre 20 à ce magnifique projet", "", new Date(), new Date(), Etat.EnCours, (Tache) null));
//        Membre meriem = new Membre("Meriem");
//        meriem.assignerTache(new Tache("Mettre 20 à ce magnifique projet", "", new Date(), new Date(), Etat.EnCours, (Tache) null));
//        Membre aurelie = new Membre("Aurélie");
//        aurelie.assignerTache(new Tache("Mettre 20 à ce magnifique projet", "", new Date(), new Date(), Etat.EnCours, (Tache) null));
//        projet.getMembres().add(xavier);
//        projet.getMembres().add(meriem);
//        projet.getMembres().add(aurelie);
        new FenetreChoixMembre(this.projet);
//        this.setVisible(false);
    }//GEN-LAST:event_membersActionPerformed

    private void globalViewActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_globalViewActionPerformed
        // TODO add your handling code here:
        //Calendar calendar = Calendar.getInstance();
        //calendar.set(2023, Calendar.MAY, 30);
        //Date dateFin = calendar.getTime();
        //Projet projet = new Projet("Projet TOB", new Tache("Projet", "", new Date(), new Date(), Etat.EnCours, (Tache) null), new HashSet<Membre>(), "Description du projet", new Date(), dateFin);
        EventQueue.invokeLater(new Runnable() {
        	public void run() {
                    VueGlobale vue = new VueGlobale(projet);
                    new ControleurVueGlobale(projet,vue);
			}
        });
//        this.setVisible(false);
    }//GEN-LAST:event_globalViewActionPerformed

    private void treeActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_treeActionPerformed
        // TODO add your handling code here:
    }//GEN-LAST:event_treeActionPerformed

    private void projectsActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_projectsActionPerformed
        // TODO add your handling code here:
        Project project = new Project();
        project.setVisible(true);
        this.setVisible(false);
    }//GEN-LAST:event_projectsActionPerformed

    private void treeMouseClicked(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_treeMouseClicked
 
        //creation modèle
	        ArbreTache model = new ArbreTache(this.projet);
	        //création vue
	        NoeudVue view = new NoeudVue(model);
	        //ajout de la vue en tant que listener de l'arbre
	        model.addTreeModelListener(view);
	        ModificationArbreButtons Buttons = new ModificationArbreButtons();
	        ArbreVue treeView = new ArbreVue(view, Buttons);
	        
	        
	        ArbreController global = new ArbreController(model, treeView);

    

	        // Ajoutez la vue à la fenêtre principale
	        
	        
	        treeView.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
	        treeView.pack();
	        treeView.setSize(800, 600);
	        treeView.setVisible(true);
        
    }//GEN-LAST:event_treeMouseClicked

    // Variables declaration - do not modify//GEN-BEGIN:variables
    private javax.swing.JButton account;
    private javax.swing.JButton exit;
    private javax.swing.JButton globalView;
    private javax.swing.JPanel header;
    private javax.swing.JLabel jLabel12;
    private javax.swing.JLabel jLabel2;
    private javax.swing.JLabel jLabel3;
    private javax.swing.JPanel jPanel9;
    private javax.swing.JTextField jTextField1;
    private javax.swing.JButton members;
    private javax.swing.JPanel menuBar;
    private javax.swing.JButton minimize;
    private javax.swing.JButton overview;
    private javax.swing.JLabel projectName;
    private javax.swing.JButton projects;
    private javax.swing.JPanel rootProject;
    private javax.swing.JButton signOut;
    private javax.swing.JButton tree;
    // End of variables declaration//GEN-END:variables
}
