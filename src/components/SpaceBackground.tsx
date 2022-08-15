import { motion, AnimatePresence } from 'framer-motion';

interface SpaceBackgroundProps {
    active: boolean;
}

export const SpaceBackground = ({ active }: SpaceBackgroundProps) => {
    return (
        <AnimatePresence>
            {active ? (
                <motion.div
                    key="spaceWrap"
                    animate={{ opacity: 1 }}
                    initial={{ opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                >
                    <motion.div
    className="pointer-events-none absolute inset-0 opacity-40 bg-blend-soft-light"
    key="space"
    animate={{
        background: [
            'radial-gradient(ellipse at 100% 100%, #8776BB 0%, transparent 50%), radial-gradient(ellipse at 70% 0, #7F4CA2 0%, transparent 50%), radial-gradient(ellipse at 30% 100%, rgba(218, 150, 85, 0.59) 0%, transparent 50%), radial-gradient(ellipse at 10% 0, #A969DA 0%, transparent 50%), linear-gradient(#4E8277, #4E8277)',
            'radial-gradient(ellipse at 100% 100%, #B3BB76 0%, transparent 50%), radial-gradient(ellipse at 30% 0, #A2584C 0%, transparent 50%), radial-gradient(ellipse at 20% 100%, rgba(181, 85, 218, 0.59) 0%, transparent 50%), radial-gradient(ellipse at 60% 0, #69BADA 0%, transparent 50%), linear-gradient(#824E7C, #824E7C)',
            'radial-gradient(ellipse at 100% 100%, #808271 0%, transparent 50%), radial-gradient(ellipse at 50% 0, #DDC5C2 0%, transparent 50%), radial-gradient(ellipse at 60% 100%, rgba(70, 15, 15, 0.59) 0%, transparent 50%), radial-gradient(ellipse at 50% 0, #6C3333 0%, transparent 50%), linear-gradient(#958181, #958181)',
            'radial-gradient(ellipse at 100% 100%, #8776BB 0%, transparent 50%), radial-gradient(ellipse at 70% 0, #7F4CA2 0%, transparent 50%), radial-gradient(ellipse at 30% 100%, rgba(218, 150, 85, 0.59) 0%, transparent 50%), radial-gradient(ellipse at 10% 0, #A969DA 0%, transparent 50%), linear-gradient(#4E8277, #4E8277)',
        ],
    }}
    transition={{
        duration: 15,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatDelay: 1,
    }}
    />
                </motion.div>
            ) : (
                ''
            )}
        </AnimatePresence>
    );
};