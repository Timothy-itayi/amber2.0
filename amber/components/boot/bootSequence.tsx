import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Animated, ScrollView, StyleSheet } from 'react-native';

// Log entry with color coding
interface LogEntry {
  text: string;
  color: 'green' | 'white' | 'red' | 'orange' | 'blue' | 'dim' | 'amber';
}

// Compact ASCII eye logo for top-right corner
const ASCII_LOGO = [
  "    ▄████▄    ",
  "  ▄██▀▀▀▀██▄  ",
  " ██▀ ▄██▄ ▀██ ",
  " ██ ██▀▀██ ██ ",
  " ██▀ ▀██▀ ▀██ ",
  "  ▀██▄▄▄▄██▀  ",
  "    ▀████▀    ",
  "              ",
  "    AMBER     ",
  " SURVEILLANCE ",
];

// 90s Linux-style boot messages
const BOOT_LOGS: LogEntry[] = [
  { text: "LILO 22.1 boot:", color: 'white' },
  { text: "Loading AMBER....................", color: 'amber' },
  { text: "", color: 'dim' },
  { text: "Linux version 2.0.36 (root@amber) (gcc version 2.7.2.3) #1", color: 'white' },
  { text: "Console: colour VGA+ 80x25", color: 'dim' },
  { text: "Calibrating delay loop.. ok - 199.47 BogoMIPS", color: 'green' },
  { text: "Memory: 130048k/131072k available (756k kernel code, 384k reserved, 884k data)", color: 'dim' },
  { text: "Swansea University Computer Society NET3.035 for Linux 2.0", color: 'dim' },
  { text: "NET3: Unix domain sockets 0.13 for Linux NET3.035.", color: 'dim' },
  { text: "Swansea University Computer Society TCP/IP for NET3.034", color: 'dim' },
  { text: "IP Protocols: ICMP, UDP, TCP", color: 'green' },
  { text: "VFS: Diskquotas version dquot_5.6.0 initialized", color: 'dim' },
  { text: "Checking 386/387 coupling... Ok, fpu using exception 16 error reporting.", color: 'green' },
  { text: "Checking 'hlt' instruction... Ok.", color: 'green' },
  { text: "Linux NET3.035 for Linux 2.0", color: 'dim' },
  { text: "Serial driver version 4.13 with no serial options enabled", color: 'dim' },
  { text: "tty00 at 0x03f8 (irq = 4) is a 16550A", color: 'dim' },
  { text: "tty01 at 0x02f8 (irq = 3) is a 16550A", color: 'dim' },
  { text: "Real Time Clock Driver v1.09", color: 'dim' },
  { text: "Ramdisk driver initialized : 16 ramdisks of 4096K size", color: 'dim' },
  { text: "hda: WDC AC31600H, 1549MB w/128kB Cache, CHS=787/64/63", color: 'white' },
  { text: "hdb: ATAPI CDROM, ATAPI CDROM drive", color: 'dim' },
  { text: "ide0 at 0x1f0-0x1f7,0x3f6 on irq 14", color: 'dim' },
  { text: "Floppy drive(s): fd0 is 1.44M", color: 'dim' },
  { text: "FDC 0 is a post-1991 82077", color: 'dim' },
  { text: "md driver 0.36.3 MAX_MD_DEV=4, MAX_REAL=8", color: 'dim' },
  { text: "scsi : 0 hosts.", color: 'dim' },
  { text: "scsi : detected total.", color: 'dim' },
  { text: "Partition check:", color: 'white' },
  { text: "  hda: hda1 hda2 hda3", color: 'dim' },
  { text: "VFS: Mounted root (ext2 filesystem) readonly.", color: 'green' },
  { text: "Adding Swap: 65528k swap-space (priority -1)", color: 'dim' },
  { text: "", color: 'dim' },
  { text: "INIT: version 2.74 booting", color: 'amber' },
  { text: "", color: 'dim' },
  { text: "Activating swap partitions", color: 'dim' },
  { text: "Checking root filesystem", color: 'dim' },
  { text: "/dev/hda1: clean, 23451/102400 files, 312087/409600 blocks", color: 'green' },
  { text: "Remounting root filesystem in read-write mode", color: 'dim' },
  { text: "Mounting local filesystems", color: 'dim' },
  { text: "Turning on user and group quotas for local filesystems", color: 'dim' },
  { text: "Checking all filesystems: /dev/hda3 clean", color: 'green' },
  { text: "", color: 'dim' },
  { text: "Setting up IP spoofing protection: done", color: 'green' },
  { text: "Configuring kernel parameters:  done", color: 'green' },
  { text: "Setting up IP forwarding: done", color: 'green' },
  { text: "Setting the System Clock using the Hardware Clock as reference...", color: 'dim' },
  { text: "System Clock set. Local time: Wed Jan 28 03:42:17 PST 2026", color: 'dim' },
  { text: "", color: 'dim' },
  { text: "Starting system logger: syslogd klogd.", color: 'green' },
  { text: "Starting kernel logger: klogd.", color: 'green' },
  { text: "Loading modules: ne2k-pci", color: 'dim' },
  { text: "ne2k-pci.c:vpre-1.00e 5/27/99 D. Becker/P. Gortmaker", color: 'dim' },
  { text: "eth0: RealTek RTL-8029 found at 0x6100, IRQ 10, 00:40:05:A0:74:2B.", color: 'green' },
  { text: "", color: 'dim' },
  { text: "Configuring network interfaces:", color: 'white' },
  { text: "  eth0: inet 10.9.11.44  netmask 255.255.255.0  broadcast 10.9.11.255", color: 'amber' },
  { text: "  lo: inet 127.0.0.1  netmask 255.0.0.0", color: 'dim' },
  { text: "Starting portmap daemon: portmap.", color: 'dim' },
  { text: "Mounting remote filesystems: done", color: 'green' },
  { text: "", color: 'dim' },
  { text: "Starting periodic command scheduler: cron.", color: 'dim' },
  { text: "Starting AMBER Surveillance Daemon: amberd.", color: 'amber' },
  { text: "Starting biometric scanner interface: biosd.", color: 'amber' },
  { text: "Starting facial recognition subsystem: facerec.", color: 'amber' },
  { text: "Loading operator database: 1422 active records.", color: 'amber' },
  { text: "Syncing with Central Watcher: connected.", color: 'green' },
  { text: "", color: 'dim' },
  { text: "INIT: Entering runlevel: 3", color: 'white' },
  { text: "", color: 'dim' },
  { text: "Starting sshd: done", color: 'dim' },
  { text: "Starting inetd: done", color: 'dim' },
  { text: "", color: 'dim' },
  { text: "===============================================", color: 'amber' },
  { text: "  AMBER SURVEILLANCE OS v2.7.4", color: 'amber' },
  { text: "  (c) 2026 Global Surveillance Organization", color: 'dim' },
  { text: "  ALL ACTIVITY IS MONITORED AND LOGGED", color: 'orange' },
  { text: "===============================================", color: 'amber' },
  { text: "", color: 'dim' },
  { text: "Login: op-7734", color: 'white' },
  { text: "Password: ********", color: 'dim' },
  { text: "", color: 'dim' },
  { text: "Last login: Tue Jan 27 22:15:03 on tty1", color: 'dim' },
  { text: "Welcome, Operator OP-7734. Clearance: PROVISIONAL.", color: 'orange' },
  { text: "Your shift begins now. Stand by for briefing...", color: 'amber' },
];

// Color palette - 90s amber terminal vibes
const COLORS = {
  green: '#33ff33',
  white: '#cccccc',
  red: '#ff3333',
  orange: '#ff9933',
  blue: '#3399ff',
  dim: '#666666',
  amber: '#ffcc00',
};

export const BootSequence = ({ onComplete }: { onComplete: () => void }) => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const progressAnim = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);
  
  useEffect(() => {    
    let logIndex = 0;
    
    // Animate logs with randomized timing
    const showNextLog = () => {
      if (logIndex < BOOT_LOGS.length) {
        setLogs(prev => [...prev, BOOT_LOGS[logIndex]]);
        logIndex++;
        scrollViewRef.current?.scrollToEnd({ animated: true });
        
        const nextDelay = 80 + Math.random() * 350;
        setTimeout(showNextLog, nextDelay);
      }
    };
    
    showNextLog();

    // Animate progress bar
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 10000,
      useNativeDriver: false,
    }).start(() => {
      setTimeout(onComplete, 1000);
    });
  }, []);

  return (
    <View style={styles.container}>
      {/* ASCII Logo - Top Right Corner */}
      <View style={styles.logoContainer}>
        {ASCII_LOGO.map((line, i) => (
          <Text key={i} style={styles.logoText}>{line}</Text>
        ))}
      </View>

      {/* Scrolling Boot Logs - Full Width */}
      <ScrollView 
        ref={scrollViewRef}
        style={styles.logContainer}
        contentContainerStyle={{ paddingBottom: 10 }}
      >
        {logs.map((log, i) => {
          if (!log) return null;
          const colorKey = log.color as keyof typeof COLORS;
          const color = (colorKey && COLORS[colorKey]) ? COLORS[colorKey] : COLORS.dim;
          return (
            <Text key={i} style={[styles.logText, { color }]}>
              {log.text}
            </Text>
          );
        })}
      </ScrollView>

      {/* Progress Bar */}
      <View style={styles.progressSection}>
        <Text style={styles.statusText}>[ LOADING KERNEL MODULES ]</Text>
        <View style={styles.progressContainer}>
          <Animated.View 
            style={[
              styles.progressBar, 
              { 
                width: progressAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%']
                }),
                backgroundColor: progressAnim.interpolate({
                  inputRange: [0, 0.7, 1],
                  outputRange: [COLORS.amber, COLORS.amber, COLORS.green]
                })
              }
            ]} 
          />
        </View>
        <Text style={styles.progressLabel}>
          {logs.length}/{BOOT_LOGS.length} processes
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    padding: 10,
    paddingTop: 40,
  },
  logoContainer: {
    position: 'absolute',
    top: 40,
    right: 10,
    zIndex: 10,
    alignItems: 'center',
  },
  logoText: {
    fontFamily: 'monospace',
    fontSize: 7,
    lineHeight: 8,
    color: '#ffcc00',
    textAlign: 'center',
  },
  logContainer: {
    flex: 1,
    backgroundColor: '#000000',
    paddingRight: 90, // Leave space for logo
  },
  logText: {
    fontFamily: 'monospace',
    fontSize: 10,
    lineHeight: 14,
    marginBottom: 1,
  },
  progressSection: {
    paddingTop: 8,
    paddingBottom: 30,
  },
  progressContainer: {
    height: 18,
    borderWidth: 1,
    borderColor: '#333333',
    backgroundColor: '#111111',
    padding: 2,
  },
  progressBar: {
    height: '100%',
  },
  statusText: {
    color: '#ffcc00',
    fontFamily: 'monospace',
    fontSize: 10,
    marginBottom: 6,
    textAlign: 'center',
    letterSpacing: 1,
  },
  progressLabel: {
    color: '#666666',
    fontFamily: 'monospace',
    fontSize: 9,
    marginTop: 4,
    textAlign: 'right',
  },
});
