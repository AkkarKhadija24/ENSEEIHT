/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/GUIForms/JFrame.java to edit this template
 */
package projectmanagment;

import java.util.Set;
import java.util.HashSet;
import java.util.List;
import java.awt.Color;
import java.awt.Cursor;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashSet;
import javax.swing.ImageIcon;
import javax.swing.JButton;
import javax.swing.JTextField;
import javax.swing.border.EmptyBorder;
import javax.swing.plaf.basic.BasicButtonUI;
import javax.swing.plaf.basic.BasicTextFieldUI;

import projectmanagment.Account;
import projectmanagment.Home;
import projectmanagment.Login;
import projectmanagment.ProjectView;

/**
 *
 * @author Z 400
 */
public class Project extends javax.swing.JFrame {

    private int mouseX, mouseY;
    
    private List<Projet> projets;
    //private Set<Projet> tab = new HashSet<>();
    
    public Project() {
    	projets = Sauvegarde.chargerTousProjets();
    	if (projets.size() == 0) {
    		Calendar calendar = Calendar.getInstance();
          calendar.set(2023, Calendar.MAY, 30);
          Date dateFin = calendar.getTime();
          Tache tache = new Tache("Mettre 20 à ce magnifique projet", "", new Date(), new Date(), Etat.EnCours, (Tache) null);
          Projet projet = new Projet("Projet TOB", tache, new HashSet<Membre>(), "Description du projet", new Date(), dateFin);
          Membre aurelie = new Membre("Aurélie");
          aurelie.assignerTache(tache);
          projet.getMembres().add(aurelie);
          projets.add(projet);
    	}
        initComponents();
        messName.setVisible(false);
        messDes.setVisible(false);
        messMem.setVisible(false);
        messTasks.setVisible(false);
        messFdate.setVisible(false);
        messEdate.setVisible(false);
        minimize.setBorder(new EmptyBorder(0, 0, 0, 0));
        exit.setBorder(new EmptyBorder(0, 0, 0, 0));
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
        
        description.setCursor(new Cursor(Cursor.TEXT_CURSOR));
        description.setUI(new BasicTextFieldUI());
        
        addProject.setCursor(new Cursor(Cursor.HAND_CURSOR));
        addProject.setUI(new BasicButtonUI());
        addProject.addMouseListener( new MouseListener(){
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
                        addProject.setBackground(new Color(88,101,242));
                    }

                    @Override
                    public void mouseExited(MouseEvent e) {
                        addProject.setBackground(new Color(218,215,215));
                    }

                }

                );
        
        JTextField[] txtf = {name, members, tasks};
        for(JTextField txt : txtf){
            txt.setCursor(new Cursor(Cursor.TEXT_CURSOR));
            txt.setUI(new BasicTextFieldUI());
            txt.addMouseListener( new MouseListener(){
                    @Override
                    public void mouseClicked(MouseEvent e) {
                    }

                    @Override
                    public void mousePressed(MouseEvent e) {
                        txt.setText("");
                    }

                    @Override
                    public void mouseReleased(MouseEvent e) {
                    }

                    @Override
                    public void mouseEntered(MouseEvent e) {
                    }

                    @Override
                    public void mouseExited(MouseEvent e) {
                    }

                }

                );
        }
        
        projects.setBackground(new Color(97, 96, 97));
        projects.setCursor(new Cursor(Cursor.HAND_CURSOR));
        projects.setUI(new BasicButtonUI());
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
        bodyProject = new projectmanagment.RoundPanel();
        jScrollPane1 = new javax.swing.JScrollPane();
        table = new javax.swing.JTable();
        name = new javax.swing.JTextField();
        messName = new javax.swing.JLabel();
        messTasks = new javax.swing.JLabel();
        tasks = new javax.swing.JTextField();
        messDes = new javax.swing.JLabel();
        jLabel1 = new javax.swing.JLabel();
        jScrollPane2 = new javax.swing.JScrollPane();
        description = new javax.swing.JTextPane();
        messFdate = new javax.swing.JLabel();
        fDate = new javax.swing.JTextField();
        eDate = new javax.swing.JTextField();
        messEdate = new javax.swing.JLabel();
        members = new javax.swing.JTextField();
        messMem = new javax.swing.JLabel();
        addProject = new javax.swing.JButton();
        menuBar = new javax.swing.JPanel();
        jLabel12 = new javax.swing.JLabel();
        exit = new javax.swing.JButton();
        overview = new javax.swing.JButton();
        projects = new javax.swing.JButton();
        account = new javax.swing.JButton();
        signOut = new javax.swing.JButton();

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
            .addComponent(jPanel9, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
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

        table.setForeground(new java.awt.Color(87, 78, 213));
        table.setModel(new javax.swing.table.DefaultTableModel(new Object[] {"Nom du projet"}, 1) {
            private static final long serialVersionUID = 1L;
			Class[] types = new Class [] {
                java.lang.String.class, java.lang.String.class
            };

            public Class getColumnClass(int columnIndex) {
                return types [columnIndex];
            }
        });
        for (Projet p : this.projets) {
        	javax.swing.table.DefaultTableModel model = (javax.swing.table.DefaultTableModel) table.getModel();
        	System.out.print(p.getName());
            model.addRow(new Object[]{p.getName()});
            table.setModel(model);
        }
        table.setColumnSelectionAllowed(true);
        table.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseClicked(java.awt.event.MouseEvent evt) {
                tableMouseClicked(evt);
            }
        });
        jScrollPane1.setViewportView(table);
        table.getColumnModel().getSelectionModel().setSelectionMode(javax.swing.ListSelectionModel.SINGLE_SELECTION);

        name.setBackground(new java.awt.Color(244, 244, 244));
        name.setText("Name");
        name.setBorder(javax.swing.BorderFactory.createMatteBorder(0, 0, 1, 0, new java.awt.Color(0, 0, 0)));
        name.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mousePressed(java.awt.event.MouseEvent evt) {
                nameMousePressed(evt);
            }
        });
        name.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                nameActionPerformed(evt);
            }
        });

        messName.setFont(new java.awt.Font("Segoe UI", 1, 12)); // NOI18N
        messName.setForeground(new java.awt.Color(255, 0, 0));
        messName.setText("Name is empty");

        messTasks.setFont(new java.awt.Font("Segoe UI", 1, 12)); // NOI18N
        messTasks.setForeground(new java.awt.Color(255, 0, 0));
        messTasks.setText("Tasks is empty");

        tasks.setBackground(new java.awt.Color(244, 244, 244));
        tasks.setText("Tasks");
        tasks.setBorder(javax.swing.BorderFactory.createMatteBorder(0, 0, 1, 0, new java.awt.Color(0, 0, 0)));
        tasks.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mousePressed(java.awt.event.MouseEvent evt) {
                tasksMousePressed(evt);
            }
        });
        tasks.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                tasksActionPerformed(evt);
            }
        });

        messDes.setFont(new java.awt.Font("Segoe UI", 1, 12)); // NOI18N
        messDes.setForeground(new java.awt.Color(255, 0, 0));
        messDes.setText("Description is empty");

        jLabel1.setText("Description");

        description.setBackground(new java.awt.Color(244, 244, 244));
        description.setBorder(javax.swing.BorderFactory.createEmptyBorder(0, 0, 0, 0));
        jScrollPane2.setViewportView(description);

        messFdate.setFont(new java.awt.Font("Segoe UI", 1, 12)); // NOI18N
        messFdate.setForeground(new java.awt.Color(255, 0, 0));
        messFdate.setText("First date is empty");

        fDate.setBackground(new java.awt.Color(244, 244, 244));
        fDate.setText("First Date : yyyy-MM-dd");
        fDate.setBorder(javax.swing.BorderFactory.createMatteBorder(0, 0, 1, 0, new java.awt.Color(0, 0, 0)));
        fDate.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mousePressed(java.awt.event.MouseEvent evt) {
                fDateMousePressed(evt);
            }
        });
        fDate.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                fDateActionPerformed(evt);
            }
        });

        eDate.setBackground(new java.awt.Color(244, 244, 244));
        eDate.setText("End Date : yyyy-MM-dd");
        eDate.setBorder(javax.swing.BorderFactory.createMatteBorder(0, 0, 1, 0, new java.awt.Color(0, 0, 0)));
        eDate.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mousePressed(java.awt.event.MouseEvent evt) {
                eDateMousePressed(evt);
            }
        });
        eDate.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                eDateActionPerformed(evt);
            }
        });

        messEdate.setFont(new java.awt.Font("Segoe UI", 1, 12)); // NOI18N
        messEdate.setForeground(new java.awt.Color(255, 0, 0));
        messEdate.setText("End date is empty");

        members.setBackground(new java.awt.Color(244, 244, 244));
        members.setText("Members : m1, m2, ...");
        members.setBorder(javax.swing.BorderFactory.createMatteBorder(0, 0, 1, 0, new java.awt.Color(0, 0, 0)));
        members.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mousePressed(java.awt.event.MouseEvent evt) {
                membersMousePressed(evt);
            }
        });
        members.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                membersActionPerformed(evt);
            }
        });

        messMem.setFont(new java.awt.Font("Segoe UI", 1, 12)); // NOI18N
        messMem.setForeground(new java.awt.Color(255, 0, 0));
        messMem.setText("Members is empty");

        addProject.setBackground(new java.awt.Color(218, 215, 215));
        addProject.setText("Add Project");
        addProject.setBorder(javax.swing.BorderFactory.createEmptyBorder(0, 0, 0, 0));
        addProject.setPreferredSize(new java.awt.Dimension(65, 22));
        addProject.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mousePressed(java.awt.event.MouseEvent evt) {
                addProjectMousePressed(evt);
            }
        });
        addProject.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                addProjectActionPerformed(evt);
            }
        });

        javax.swing.GroupLayout bodyProjectLayout = new javax.swing.GroupLayout(bodyProject);
        bodyProject.setLayout(bodyProjectLayout);
        bodyProjectLayout.setHorizontalGroup(
            bodyProjectLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addComponent(jScrollPane1, javax.swing.GroupLayout.DEFAULT_SIZE, 774, Short.MAX_VALUE)
            .addGroup(bodyProjectLayout.createSequentialGroup()
                .addGap(63, 63, 63)
                .addGroup(bodyProjectLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.TRAILING)
                    .addComponent(addProject, javax.swing.GroupLayout.PREFERRED_SIZE, 247, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addGroup(bodyProjectLayout.createSequentialGroup()
                        .addGroup(bodyProjectLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.TRAILING)
                            .addGroup(bodyProjectLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.TRAILING)
                                .addComponent(jScrollPane2, javax.swing.GroupLayout.PREFERRED_SIZE, 247, javax.swing.GroupLayout.PREFERRED_SIZE)
                                .addGroup(javax.swing.GroupLayout.Alignment.LEADING, bodyProjectLayout.createSequentialGroup()
                                    .addComponent(jLabel1)
                                    .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                                    .addComponent(messDes, javax.swing.GroupLayout.PREFERRED_SIZE, 131, javax.swing.GroupLayout.PREFERRED_SIZE))
                                .addGroup(bodyProjectLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                                    .addComponent(messFdate, javax.swing.GroupLayout.PREFERRED_SIZE, 131, javax.swing.GroupLayout.PREFERRED_SIZE)
                                    .addComponent(fDate, javax.swing.GroupLayout.PREFERRED_SIZE, 247, javax.swing.GroupLayout.PREFERRED_SIZE)))
                            .addGroup(bodyProjectLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                                .addComponent(messName, javax.swing.GroupLayout.PREFERRED_SIZE, 131, javax.swing.GroupLayout.PREFERRED_SIZE)
                                .addComponent(name, javax.swing.GroupLayout.PREFERRED_SIZE, 247, javax.swing.GroupLayout.PREFERRED_SIZE)))
                        .addGap(56, 56, 56)
                        .addGroup(bodyProjectLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.TRAILING)
                            .addGroup(bodyProjectLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                                .addComponent(tasks, javax.swing.GroupLayout.Alignment.TRAILING, javax.swing.GroupLayout.PREFERRED_SIZE, 247, javax.swing.GroupLayout.PREFERRED_SIZE)
                                .addComponent(members, javax.swing.GroupLayout.Alignment.TRAILING, javax.swing.GroupLayout.PREFERRED_SIZE, 247, javax.swing.GroupLayout.PREFERRED_SIZE)
                                .addComponent(messTasks, javax.swing.GroupLayout.PREFERRED_SIZE, 131, javax.swing.GroupLayout.PREFERRED_SIZE)
                                .addComponent(messMem, javax.swing.GroupLayout.PREFERRED_SIZE, 131, javax.swing.GroupLayout.PREFERRED_SIZE))
                            .addGroup(bodyProjectLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                                .addComponent(messEdate, javax.swing.GroupLayout.PREFERRED_SIZE, 131, javax.swing.GroupLayout.PREFERRED_SIZE)
                                .addComponent(eDate, javax.swing.GroupLayout.PREFERRED_SIZE, 247, javax.swing.GroupLayout.PREFERRED_SIZE)))))
                .addContainerGap(javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
        );
        bodyProjectLayout.setVerticalGroup(
            bodyProjectLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(bodyProjectLayout.createSequentialGroup()
                .addComponent(jScrollPane1, javax.swing.GroupLayout.PREFERRED_SIZE, 225, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGap(31, 31, 31)
                .addGroup(bodyProjectLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(messName)
                    .addComponent(messTasks))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addGroup(bodyProjectLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(name, javax.swing.GroupLayout.PREFERRED_SIZE, 36, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addComponent(tasks, javax.swing.GroupLayout.PREFERRED_SIZE, 36, javax.swing.GroupLayout.PREFERRED_SIZE))
                .addGap(18, 18, 18)
                .addGroup(bodyProjectLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, bodyProjectLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                        .addComponent(jLabel1)
                        .addComponent(messDes))
                    .addComponent(messMem, javax.swing.GroupLayout.Alignment.TRAILING))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addGroup(bodyProjectLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addComponent(members, javax.swing.GroupLayout.PREFERRED_SIZE, 36, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addComponent(jScrollPane2, javax.swing.GroupLayout.PREFERRED_SIZE, 35, javax.swing.GroupLayout.PREFERRED_SIZE))
                .addGap(18, 18, 18)
                .addGroup(bodyProjectLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addGroup(bodyProjectLayout.createSequentialGroup()
                        .addComponent(messFdate)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addComponent(fDate, javax.swing.GroupLayout.PREFERRED_SIZE, 36, javax.swing.GroupLayout.PREFERRED_SIZE))
                    .addGroup(bodyProjectLayout.createSequentialGroup()
                        .addComponent(messEdate)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addComponent(eDate, javax.swing.GroupLayout.PREFERRED_SIZE, 36, javax.swing.GroupLayout.PREFERRED_SIZE)))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, 21, Short.MAX_VALUE)
                .addComponent(addProject, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE))
        );

        menuBar.setBackground(new java.awt.Color(88, 101, 242));
        menuBar.setPreferredSize(new java.awt.Dimension(240, 680));

        jLabel12.setHorizontalAlignment(javax.swing.SwingConstants.CENTER);
        jLabel12.setIcon(new javax.swing.ImageIcon(getClass().getResource("/icons/icons8_team_builder_90px_1.png"))); // NOI18N

        exit.setBackground(new java.awt.Color(87, 100, 241));
        exit.setFont(new java.awt.Font("SansSerif", 1, 14)); // NOI18N
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

        javax.swing.GroupLayout rootProjectLayout = new javax.swing.GroupLayout(rootProject);
        rootProject.setLayout(rootProjectLayout);
        rootProjectLayout.setHorizontalGroup(
            rootProjectLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(rootProjectLayout.createSequentialGroup()
                .addComponent(menuBar, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGroup(rootProjectLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addComponent(header, javax.swing.GroupLayout.DEFAULT_SIZE, 870, Short.MAX_VALUE)
                    .addGroup(rootProjectLayout.createSequentialGroup()
                        .addGap(20, 20, 20)
                        .addComponent(bodyProject, javax.swing.GroupLayout.PREFERRED_SIZE, 834, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addGap(0, 16, Short.MAX_VALUE))))
        );
        rootProjectLayout.setVerticalGroup(
            rootProjectLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(rootProjectLayout.createSequentialGroup()
                .addGroup(rootProjectLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addGroup(rootProjectLayout.createSequentialGroup()
                        .addComponent(header, javax.swing.GroupLayout.PREFERRED_SIZE, 78, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addComponent(bodyProject, javax.swing.GroupLayout.PREFERRED_SIZE, 569, javax.swing.GroupLayout.PREFERRED_SIZE))
                    .addComponent(menuBar, javax.swing.GroupLayout.PREFERRED_SIZE, 670, javax.swing.GroupLayout.PREFERRED_SIZE))
                .addGap(0, 0, Short.MAX_VALUE))
        );

        getContentPane().add(rootProject, java.awt.BorderLayout.CENTER);

        pack();
        setLocationRelativeTo(null);
//        while(true) {
//        	try {
//				wait(1);
//			} catch (InterruptedException e) {
//				e.printStackTrace();
//			}
//        	Sauvegarde.sauvegarderTousProjets(projets);
//        }
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
        Sauvegarde.sauvegarderTousProjets(this.projets);
    	dispose();
    }//GEN-LAST:event_exitActionPerformed

    private void accountActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_accountActionPerformed
        // TODO add your handling code here:
        Account acnt = new Account();
        acnt.setVisible(true);
        this.setVisible(false);
    }//GEN-LAST:event_accountActionPerformed

    private void overviewActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_overviewActionPerformed
        // TODO add your handling code here:
        Home home = new Home();
        home.setVisible(true);
        this.setVisible(false);
    }//GEN-LAST:event_overviewActionPerformed

    private void signOutActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_signOutActionPerformed
        // TODO add your handling code here:
        Login login = new Login();
        login.setVisible(true);
        this.setVisible(false);
    }//GEN-LAST:event_signOutActionPerformed

    private void tableMouseClicked(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_tableMouseClicked
        // TODO add your handling code here:
    	System.out.print("ok");
        int row = table.rowAtPoint(evt.getPoint());
        int col = table.columnAtPoint(evt.getPoint());
        if (row >= 1) {
        	int selected = table.getSelectedRow();
//            String cellValue = (String) table.getValueAt(row, 0); // Première colonne (index 0)
            // Événement de clic sur la cellule "JavaProject"
            ProjectView pView = new ProjectView(this.projets.get(selected-1));
            pView.setVisible(true);
            this.setVisible(false);
        }
    }//GEN-LAST:event_tableMouseClicked

    private void nameMousePressed(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_nameMousePressed
        // TODO add your handling code here:
        members.setText("");
    }//GEN-LAST:event_nameMousePressed

    private void nameActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_nameActionPerformed
        // TODO add your handling code here:
    }//GEN-LAST:event_nameActionPerformed

    private void tasksMousePressed(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_tasksMousePressed
        // TODO add your handling code here:
        tasks.setText("");
    }//GEN-LAST:event_tasksMousePressed

    private void tasksActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_tasksActionPerformed
        // TODO add your handling code here:
    }//GEN-LAST:event_tasksActionPerformed

    private void fDateMousePressed(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_fDateMousePressed
        // TODO add your handling code here:
        fDate.setText("");
    }//GEN-LAST:event_fDateMousePressed

    private void fDateActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_fDateActionPerformed
        // TODO add your handling code here:
    }//GEN-LAST:event_fDateActionPerformed

    private void eDateMousePressed(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_eDateMousePressed
        // TODO add your handling code here:
        eDate.setText("");
    }//GEN-LAST:event_eDateMousePressed

    private void eDateActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_eDateActionPerformed
        // TODO add your handling code here:
    }//GEN-LAST:event_eDateActionPerformed

    private void membersMousePressed(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_membersMousePressed
        // TODO add your handling code here:
        members.setText("");
    }//GEN-LAST:event_membersMousePressed

    private void membersActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_membersActionPerformed
        // TODO add your handling code here:
    }//GEN-LAST:event_membersActionPerformed

    private void addProjectMousePressed(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_addProjectMousePressed
        // TODO add your handling code here:

        String nameProject = name.getText();
        String membrs = members.getText();
        String task = tasks.getText();
        String desc = description.getText();
        String date1 = fDate.getText();      //"yyyy-MM-dd"
        String date2 = eDate.getText();      //"yyyy-MM-dd"
        String formatChaineDate = "yyyy-MM-dd";
        SimpleDateFormat sdf = new SimpleDateFormat(formatChaineDate);
        Date date11 = null;
        Date date22 = null;
        Set<Projet> tab = new HashSet<>();
        
        try {
            date11 = sdf.parse(date1);
            date22 = sdf.parse(date1);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        HashSet<Membre> member = new HashSet<>();
        Tache tache = new Tache(task, task, date11, date22);
        String[] noms = membrs.split(",");
        for (String nom : noms) {
            Membre membre = new Membre(nom);
            member.add(membre);
        }
        Projet prj = new Projet(nameProject, tache, member, desc, date11, date22);
        Object[] newLine = {prj.getName()};
        if(nameProject.isEmpty()){
            messName.setForeground(Color.red);
        }
        if(membrs.isEmpty()){
            messMem.setForeground(Color.red);
        }
        if(task.isEmpty()){
            messTasks.setForeground(Color.red);
        }
        if (desc.isEmpty()){
            messDes.setForeground(Color.red);
        }
        if (date1.isEmpty()){
            messFdate.setForeground(Color.red);
        }
        if (date2.isEmpty()){
            messEdate.setForeground(Color.red);
        }
        javax.swing.table.DefaultTableModel model = (javax.swing.table.DefaultTableModel) table.getModel();

        if(!nameProject.isEmpty() && !membrs.isEmpty() && !task.isEmpty() && !desc.isEmpty() && !date1.isEmpty() && !date2.isEmpty()){
        	tab.add(prj);
        	model.addRow(newLine);
        	table.setModel(model);
        }
        this.projets.add(prj);
    }//GEN-LAST:event_addProjectMousePressed

    private void addProjectActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_addProjectActionPerformed
        // TODO add your handling code here:
    }//GEN-LAST:event_addProjectActionPerformed

    // Variables declaration - do not modify//GEN-BEGIN:variables
    private javax.swing.JButton account;
    private javax.swing.JButton addProject;
    private projectmanagment.RoundPanel bodyProject;
    private javax.swing.JTextPane description;
    private javax.swing.JTextField eDate;
    private javax.swing.JButton exit;
    private javax.swing.JTextField fDate;
    private javax.swing.JPanel header;
    private javax.swing.JLabel jLabel1;
    private javax.swing.JLabel jLabel12;
    private javax.swing.JLabel jLabel2;
    private javax.swing.JLabel jLabel3;
    private javax.swing.JPanel jPanel9;
    private javax.swing.JScrollPane jScrollPane1;
    private javax.swing.JScrollPane jScrollPane2;
    private javax.swing.JTextField jTextField1;
    private javax.swing.JTextField members;
    private javax.swing.JPanel menuBar;
    private javax.swing.JLabel messDes;
    private javax.swing.JLabel messEdate;
    private javax.swing.JLabel messFdate;
    private javax.swing.JLabel messMem;
    private javax.swing.JLabel messName;
    private javax.swing.JLabel messTasks;
    private javax.swing.JButton minimize;
    private javax.swing.JTextField name;
    private javax.swing.JButton overview;
    private javax.swing.JButton projects;
    private javax.swing.JPanel rootProject;
    private javax.swing.JButton signOut;
    private javax.swing.JTable table;
    private javax.swing.JTextField tasks;
    // End of variables declaration//GEN-END:variables
}