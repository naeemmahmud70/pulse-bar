"use client";

import {
  useState,
  useCallback,
  useEffect,
  useRef,
  forwardRef,
  type KeyboardEvent,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MoreHorizontal,
  Settings,
  Layers,
  Monitor,
  Users,
  MessageSquare,
  ChevronRight,
} from "lucide-react";
import { menuVariants, menuItemVariants, springSnappy } from "@/lib/motion";
import { Tooltip } from "@/components/ui/Tooltip";
import styles from "./OptionsMenu.module.css";

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  shortcut?: string;
  danger?: boolean;
}

const MENU_ITEMS: MenuItem[] = [
  {
    id: "settings",
    label: "Settings",
    icon: <Settings size={15} />,
    shortcut: "⌘,",
  },
  {
    id: "backgrounds",
    label: "Virtual Backgrounds",
    icon: <Layers size={15} />,
  },
  { id: "share", label: "Share Screen", icon: <Monitor size={15} /> },
  {
    id: "participants",
    label: "Participants",
    icon: <Users size={15} />,
    shortcut: "⌘U",
  },
  { id: "chat", label: "In-call Chat", icon: <MessageSquare size={15} /> },
];

export function OptionsMenu() {
  const [open, setOpen] = useState(false);
  const [focusedIdx, setFocusedIdx] = useState(0);
  const [showTip, setShowTip] = useState(false);
  const [isHov, setIsHov] = useState(false);
  const [isPres, setIsPres] = useState(false);
  const menuRef = useRef<HTMLUListElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const toggle = useCallback(() => setOpen((v) => !v), []);
  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // Escape + arrow keys
  const handleMenuKeyDown = useCallback(
    (e: KeyboardEvent<HTMLUListElement>) => {
      if (e.key === "Escape") {
        close();
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setFocusedIdx((i) => (i + 1) % MENU_ITEMS.length);
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setFocusedIdx((i) => (i - 1 + MENU_ITEMS.length) % MENU_ITEMS.length);
      }
    },
    [close],
  );

  // Focus correct item
  useEffect(() => {
    if (open) {
      setFocusedIdx(0);
      setTimeout(() => {
        const items =
          menuRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]');
        items?.[0]?.focus();
      }, 80);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const items =
      menuRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]');
    items?.[focusedIdx]?.focus();
  }, [focusedIdx, open]);

  return (
    <div className={styles.wrapper}>
      <motion.button
        ref={triggerRef}
        className={[styles.trigger, open ? styles.triggerOpen : ""].join(" ")}
        aria-label="More options"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={toggle}
        onMouseEnter={() => {
          setIsHov(true);
          setShowTip(true);
        }}
        onMouseLeave={() => {
          setIsHov(false);
          setShowTip(false);
        }}
        onMouseDown={() => setIsPres(true)}
        onMouseUp={() => setIsPres(false)}
        animate={isPres ? "press" : isHov ? "hover" : "idle"}
        variants={{
          idle: { scale: 1, rotate: 0 },
          hover: { scale: 1.06, rotate: 90 },
          press: { scale: 0.93 },
        }}
        transition={springSnappy}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? "open" : "closed"}
            initial={{ opacity: 0, rotate: -45, scale: 0.6 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 45, scale: 0.6 }}
            transition={{ type: "spring", stiffness: 320, damping: 24 }}
            style={{ display: "flex" }}
          >
            <MoreHorizontal size={20} />
          </motion.span>
        </AnimatePresence>
      </motion.button>

      {!open && <Tooltip label="More options" visible={showTip} />}

      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.menuContainer}
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <ul
              ref={menuRef}
              className={styles.menu}
              role="menu"
              aria-label="Call options"
              onKeyDown={handleMenuKeyDown}
            >
              {MENU_ITEMS.map((item, i) => (
                <MenuItemRow
                  key={item.id}
                  item={item}
                  focused={focusedIdx === i}
                  onSelect={() => {
                    setOpen(false);
                  }}
                />
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Menu Item Row ────────────────────────────────────────────────────
interface MenuItemRowProps {
  item: MenuItem;
  focused: boolean;
  onSelect: () => void;
}

const MenuItemRow = forwardRef<HTMLLIElement, MenuItemRowProps>(
  ({ item, onSelect }, ref) => {
    const [hov, setHov] = useState(false);

    return (
      <motion.li
        ref={ref}
        className={[styles.menuItem, item.danger ? styles.danger : ""].join(
          " ",
        )}
        role="menuitem"
        tabIndex={-1}
        onClick={onSelect}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") onSelect();
        }}
        variants={menuItemVariants}
        animate={hov ? "hovered" : "visible"}
        whileTap={{ scale: 0.97 }}
      >
        {/* Hover bg */}
        <AnimatePresence>
          {hov && (
            <motion.span
              className={styles.menuItemBg}
              layoutId="menu-item-bg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.12 }}
            />
          )}
        </AnimatePresence>

        <span className={styles.menuItemIcon}>{item.icon}</span>
        <span className={styles.menuItemLabel}>{item.label}</span>
        {item.shortcut && (
          <span className={styles.menuItemShortcut}>{item.shortcut}</span>
        )}
        <motion.span
          className={styles.menuItemChevron}
          animate={{ x: hov ? 2 : 0, opacity: hov ? 0.7 : 0.25 }}
          transition={springSnappy}
        >
          <ChevronRight size={13} />
        </motion.span>
      </motion.li>
    );
  },
);
MenuItemRow.displayName = "MenuItemRow";
