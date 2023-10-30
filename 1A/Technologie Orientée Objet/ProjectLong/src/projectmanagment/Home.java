/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/GUIForms/JFrame.java to edit this template
 */
package projectmanagment;

import java.awt.Color;
import java.awt.Cursor;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import javax.swing.ImageIcon;
import javax.swing.JButton;
import javax.swing.border.EmptyBorder;
import javax.swing.border.MatteBorder;
import javax.swing.plaf.basic.BasicButtonUI;

import projectmanagment.Account;
import projectmanagment.Login;
import projectmanagment.Project;

/**
 *
 * @author khadija
 */
public class Home extends javax.swing.JFrame {
    private int mouseX, mouseY;

    public Home() {
        initComponents();
        minimize.setUI(new BasicButtonUI());
        minimize.setBorder(new EmptyBorder(0, 0, 0, 0));
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
        
        overview.setBackground(new Color(97, 96, 97));
        overview.setCursor(new Cursor(Cursor.HAND_CURSOR));
        overview.setUI(new BasicButtonUI());
        JButton[] btns = {projects, account, signOut};
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
        exit.setBorder(new EmptyBorder(0, 0, 0, 0));
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

    @SuppressWarnings("unchecked")
    // <editor-fold defaultstate="collapsed" desc="Generated Code">                          
    private void initComponents() {

        rootHome = new javax.swing.JPanel();
        header = new javax.swing.JPanel();
        jLabel2 = new javax.swing.JLabel();
        jPanel9 = new javax.swing.JPanel();
        minimize = new javax.swing.JButton();
        jTextField1 = new javax.swing.JTextField();
        jLabel3 = new javax.swing.JLabel();
        bodyHome = new projectmanagment.RoundPanel();
        descPro = new javax.swing.JPanel();
        PName = new javax.swing.JLabel();
        tool = new javax.swing.JLabel();
        descPro1 = new javax.swing.JPanel();
        PName1 = new javax.swing.JLabel();
        tool1 = new javax.swing.JLabel();
        descPro2 = new javax.swing.JPanel();
        PName2 = new javax.swing.JLabel();
        tool2 = new javax.swing.JLabel();
        descPro3 = new javax.swing.JPanel();
        PName3 = new javax.swing.JLabel();
        tool3 = new javax.swing.JLabel();
        jLabel1 = new javax.swing.JLabel();
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

        rootHome.setBackground(new java.awt.Color(255, 255, 255));
        rootHome.setBorder(javax.swing.BorderFactory.createMatteBorder(1, 0, 1, 1, new java.awt.Color(88, 101, 242)));

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
        jPanel9.add(minimize, new org.netbeans.lib.awtextra.AbsoluteConstraints(847, 2, 20, 20));

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
                .addGap(0, 38, Short.MAX_VALUE))
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

        descPro.setBorder(javax.swing.BorderFactory.createMatteBorder(6, 6, 1, 1, new java.awt.Color(88, 101, 242)));
        descPro.setOpaque(false);
        descPro.setPreferredSize(new java.awt.Dimension(300, 120));

        PName.setFont(new java.awt.Font("SansSerif", 1, 14)); // NOI18N
        PName.setForeground(new java.awt.Color(40, 47, 57));
        PName.setText("Project 2");
        PName.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseClicked(java.awt.event.MouseEvent evt) {
                PNameMouseClicked(evt);
            }
        });

        tool.setFont(new java.awt.Font("SansSerif", 1, 12)); // NOI18N
        tool.setForeground(new java.awt.Color(153, 153, 153));
        tool.setText("Tool");

        javax.swing.GroupLayout descProLayout = new javax.swing.GroupLayout(descPro);
        descPro.setLayout(descProLayout);
        descProLayout.setHorizontalGroup(
            descProLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(descProLayout.createSequentialGroup()
                .addContainerGap()
                .addGroup(descProLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addComponent(PName, javax.swing.GroupLayout.PREFERRED_SIZE, 105, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addComponent(tool))
                .addContainerGap(182, Short.MAX_VALUE))
        );
        descProLayout.setVerticalGroup(
            descProLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(descProLayout.createSequentialGroup()
                .addContainerGap()
                .addComponent(PName)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, 66, Short.MAX_VALUE)
                .addComponent(tool)
                .addContainerGap())
        );

        descPro1.setBorder(javax.swing.BorderFactory.createMatteBorder(6, 6, 1, 1, new java.awt.Color(88, 101, 242)));
        descPro1.setOpaque(false);
        descPro1.setPreferredSize(new java.awt.Dimension(300, 120));

        PName1.setFont(new java.awt.Font("SansSerif", 1, 14)); // NOI18N
        PName1.setForeground(new java.awt.Color(40, 47, 57));
        PName1.setText("Project 1");
        PName1.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseClicked(java.awt.event.MouseEvent evt) {
                PName1MouseClicked(evt);
            }
        });

        tool1.setFont(new java.awt.Font("SansSerif", 1, 12)); // NOI18N
        tool1.setForeground(new java.awt.Color(153, 153, 153));
        tool1.setText("Tool");

        javax.swing.GroupLayout descPro1Layout = new javax.swing.GroupLayout(descPro1);
        descPro1.setLayout(descPro1Layout);
        descPro1Layout.setHorizontalGroup(
            descPro1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(descPro1Layout.createSequentialGroup()
                .addContainerGap()
                .addGroup(descPro1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addComponent(PName1, javax.swing.GroupLayout.PREFERRED_SIZE, 105, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addComponent(tool1))
                .addContainerGap(182, Short.MAX_VALUE))
        );
        descPro1Layout.setVerticalGroup(
            descPro1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(descPro1Layout.createSequentialGroup()
                .addContainerGap()
                .addComponent(PName1)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, 66, Short.MAX_VALUE)
                .addComponent(tool1)
                .addContainerGap())
        );

        descPro2.setBorder(javax.swing.BorderFactory.createMatteBorder(6, 6, 1, 1, new java.awt.Color(88, 101, 242)));
        descPro2.setOpaque(false);
        descPro2.setPreferredSize(new java.awt.Dimension(300, 120));

        PName2.setFont(new java.awt.Font("SansSerif", 1, 14)); // NOI18N
        PName2.setForeground(new java.awt.Color(40, 47, 57));
        PName2.setText("Project 3");
        PName2.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseClicked(java.awt.event.MouseEvent evt) {
                PName2MouseClicked(evt);
            }
        });

        tool2.setFont(new java.awt.Font("SansSerif", 1, 12)); // NOI18N
        tool2.setForeground(new java.awt.Color(153, 153, 153));
        tool2.setText("Tool");

        javax.swing.GroupLayout descPro2Layout = new javax.swing.GroupLayout(descPro2);
        descPro2.setLayout(descPro2Layout);
        descPro2Layout.setHorizontalGroup(
            descPro2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(descPro2Layout.createSequentialGroup()
                .addContainerGap()
                .addGroup(descPro2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addComponent(PName2, javax.swing.GroupLayout.PREFERRED_SIZE, 105, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addComponent(tool2))
                .addContainerGap(182, Short.MAX_VALUE))
        );
        descPro2Layout.setVerticalGroup(
            descPro2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(descPro2Layout.createSequentialGroup()
                .addContainerGap()
                .addComponent(PName2)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, 66, Short.MAX_VALUE)
                .addComponent(tool2)
                .addContainerGap())
        );

        descPro3.setBorder(javax.swing.BorderFactory.createMatteBorder(6, 6, 1, 1, new java.awt.Color(88, 101, 242)));
        descPro3.setOpaque(false);
        descPro3.setPreferredSize(new java.awt.Dimension(300, 120));

        PName3.setFont(new java.awt.Font("SansSerif", 1, 14)); // NOI18N
        PName3.setForeground(new java.awt.Color(40, 47, 57));
        PName3.setText("Project 4");
        PName3.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseClicked(java.awt.event.MouseEvent evt) {
                PName3MouseClicked(evt);
            }
        });

        tool3.setFont(new java.awt.Font("SansSerif", 1, 12)); // NOI18N
        tool3.setForeground(new java.awt.Color(153, 153, 153));
        tool3.setText("Tool");

        javax.swing.GroupLayout descPro3Layout = new javax.swing.GroupLayout(descPro3);
        descPro3.setLayout(descPro3Layout);
        descPro3Layout.setHorizontalGroup(
            descPro3Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(descPro3Layout.createSequentialGroup()
                .addContainerGap()
                .addGroup(descPro3Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addComponent(PName3, javax.swing.GroupLayout.PREFERRED_SIZE, 105, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addComponent(tool3))
                .addContainerGap(182, Short.MAX_VALUE))
        );
        descPro3Layout.setVerticalGroup(
            descPro3Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(descPro3Layout.createSequentialGroup()
                .addContainerGap()
                .addComponent(PName3)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, 66, Short.MAX_VALUE)
                .addComponent(tool3)
                .addContainerGap())
        );

        jLabel1.setFont(new java.awt.Font("Times New Roman", 1, 36)); // NOI18N
        jLabel1.setForeground(new java.awt.Color(0, 12, 102));
        jLabel1.setHorizontalAlignment(javax.swing.SwingConstants.CENTER);
        jLabel1.setText("Welcome to your consular space ");
        jLabel1.setAlignmentX(0.9F);
        jLabel1.setBorder(javax.swing.BorderFactory.createMatteBorder(1, 1, 1, 1, new java.awt.Color(0, 44, 255)));
        jLabel1.setCursor(new java.awt.Cursor(java.awt.Cursor.DEFAULT_CURSOR));

        javax.swing.GroupLayout bodyHomeLayout = new javax.swing.GroupLayout(bodyHome);
        bodyHome.setLayout(bodyHomeLayout);
        bodyHomeLayout.setHorizontalGroup(
            bodyHomeLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, bodyHomeLayout.createSequentialGroup()
                .addGap(32, 32, 32)
                .addGroup(bodyHomeLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.TRAILING)
                    .addGroup(bodyHomeLayout.createSequentialGroup()
                        .addComponent(descPro1, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, 58, Short.MAX_VALUE)
                        .addComponent(descPro, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE))
                    .addGroup(bodyHomeLayout.createSequentialGroup()
                        .addComponent(descPro2, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                        .addComponent(descPro3, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)))
                .addGap(84, 84, 84))
            .addGroup(bodyHomeLayout.createSequentialGroup()
                .addGap(80, 80, 80)
                .addComponent(jLabel1, javax.swing.GroupLayout.PREFERRED_SIZE, 584, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addContainerGap(javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
        );
        bodyHomeLayout.setVerticalGroup(
            bodyHomeLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(bodyHomeLayout.createSequentialGroup()
                .addGap(14, 14, 14)
                .addComponent(jLabel1, javax.swing.GroupLayout.PREFERRED_SIZE, 51, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGap(67, 67, 67)
                .addGroup(bodyHomeLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addComponent(descPro1, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addComponent(descPro, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, 70, Short.MAX_VALUE)
                .addGroup(bodyHomeLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addComponent(descPro2, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addComponent(descPro3, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE))
                .addGap(67, 67, 67))
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

        javax.swing.GroupLayout rootHomeLayout = new javax.swing.GroupLayout(rootHome);
        rootHome.setLayout(rootHomeLayout);
        rootHomeLayout.setHorizontalGroup(
            rootHomeLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(rootHomeLayout.createSequentialGroup()
                .addComponent(menuBar, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGroup(rootHomeLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addComponent(header, javax.swing.GroupLayout.DEFAULT_SIZE, 873, Short.MAX_VALUE)
                    .addGroup(rootHomeLayout.createSequentialGroup()
                        .addGap(20, 20, 20)
                        .addComponent(bodyHome, javax.swing.GroupLayout.PREFERRED_SIZE, 834, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addGap(0, 19, Short.MAX_VALUE))))
        );
        rootHomeLayout.setVerticalGroup(
            rootHomeLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(rootHomeLayout.createSequentialGroup()
                .addGroup(rootHomeLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addGroup(rootHomeLayout.createSequentialGroup()
                        .addComponent(header, javax.swing.GroupLayout.PREFERRED_SIZE, 78, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addComponent(bodyHome, javax.swing.GroupLayout.PREFERRED_SIZE, 569, javax.swing.GroupLayout.PREFERRED_SIZE))
                    .addComponent(menuBar, javax.swing.GroupLayout.PREFERRED_SIZE, 670, javax.swing.GroupLayout.PREFERRED_SIZE))
                .addGap(0, 0, Short.MAX_VALUE))
        );

        getContentPane().add(rootHome, java.awt.BorderLayout.CENTER);

        pack();
        setLocationRelativeTo(null);
    }// </editor-fold>                        

    private void jPanel9MouseDragged(java.awt.event.MouseEvent evt) {                                     
        this.setLocation(this.getX() + evt.getX() - this.mouseX, this.getY() + evt.getY() - this.mouseY);
    }                                    

    private void jPanel9MousePressed(java.awt.event.MouseEvent evt) {                                     
        mouseX = evt.getX();
        mouseY = evt.getY();
    }                                    

    private void exitActionPerformed(java.awt.event.ActionEvent evt) {                                     
        // TODO add your handling code here:
        dispose();
    }                                    

    private void minimizeMouseClicked(java.awt.event.MouseEvent evt) {                                      
        // TODO add your handling code here:
        this.setState(this.ICONIFIED);
    }                                     

    private void projectsActionPerformed(java.awt.event.ActionEvent evt) {                                         
        // TODO add your handling code here:
        Project project = new Project();
        project.setVisible(true);
        this.setVisible(false);
    }                                        

    private void accountActionPerformed(java.awt.event.ActionEvent evt) {                                        
        // TODO add your handling code here:
        Account acnt = new Account();
        acnt.setVisible(true);
        this.setVisible(false);
    }                                       

    private void signOutActionPerformed(java.awt.event.ActionEvent evt) {                                        
        // TODO add your handling code here:
        Login login = new Login();
        login.setVisible(true);
        this.setVisible(false);
    }                                       

    private void PName1MouseClicked(java.awt.event.MouseEvent evt) {                                    
        // TODO add your handling code here:
        Project project = new Project();
        project.setVisible(true);
        this.setVisible(false);
    }                                   

    private void PNameMouseClicked(java.awt.event.MouseEvent evt) {                                   
        // TODO add your handling code here:
        Project project = new Project();
        project.setVisible(true);
        this.setVisible(false);
    }                                  

    private void PName2MouseClicked(java.awt.event.MouseEvent evt) {                                    
        // TODO add your handling code here:
        Project project = new Project();
        project.setVisible(true);
        this.setVisible(false);
    }                                   

    private void PName3MouseClicked(java.awt.event.MouseEvent evt) {                                    
        // TODO add your handling code here:
        Project project = new Project();
        project.setVisible(true);
        this.setVisible(false);
    }                                   


    // Variables declaration - do not modify                     
    private javax.swing.JLabel PName;
    private javax.swing.JLabel PName1;
    private javax.swing.JLabel PName2;
    private javax.swing.JLabel PName3;
    private javax.swing.JButton account;
    private projectmanagment.RoundPanel bodyHome;
    private javax.swing.JPanel descPro;
    private javax.swing.JPanel descPro1;
    private javax.swing.JPanel descPro2;
    private javax.swing.JPanel descPro3;
    private javax.swing.JButton exit;
    private javax.swing.JPanel header;
    private javax.swing.JLabel jLabel1;
    private javax.swing.JLabel jLabel12;
    private javax.swing.JLabel jLabel2;
    private javax.swing.JLabel jLabel3;
    private javax.swing.JPanel jPanel9;
    private javax.swing.JTextField jTextField1;
    private javax.swing.JPanel menuBar;
    private javax.swing.JButton minimize;
    private javax.swing.JButton overview;
    private javax.swing.JButton projects;
    private javax.swing.JPanel rootHome;
    private javax.swing.JButton signOut;
    private javax.swing.JLabel tool;
    private javax.swing.JLabel tool1;
    private javax.swing.JLabel tool2;
    private javax.swing.JLabel tool3;
    // End of variables declaration                   
}
