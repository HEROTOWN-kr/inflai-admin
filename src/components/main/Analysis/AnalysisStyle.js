import { useMemo } from 'react';
import { useTheme } from '@mui/material/styles';
import { colors } from '@mui/material';

/**
 * Полный аналог makeStyles (возвращает classes)
 */
export default function useAnalysisStyles() {
    const theme = useTheme();

    return useMemo(() => {
        return {
            colorViolet: {
                color: '#6E0FFF',
            },
            colorGrey: {
                color: '#00000080',
            },
            colorGrey2: {
                color: '#00000033',
            },
            bold: {
                fontWeight: '500',
            },
            bold600: {
                fontWeight: '600',
            },
            generalStats: {
                fontWeight: 900,
                fontSize: '30px',
                textAlign: 'center',
            },
            hoverRed: {
                '&:hover': {
                    cursor: 'pointer',
                    color: 'red',
                },
            },
            textAndIcon: {
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                fontSize: '14px',
                color: '#000',
            },
            tooltip: {
                fontSize: 12,
            },
            tooltipIcon: {
                color: 'grey',
                marginLeft: 5,
            },
            orange: {
                backgroundColor: colors.orange[500],
            },
            lemon: {
                backgroundColor: 'rgb(180, 240, 70)',
            },
            purple: {
                backgroundColor: '#6E0FFF',
            },
            lightGreen: {
                backgroundColor: '#18DBA8',
            },
            yellow: {
                backgroundColor: '#FFE600',
            },
            grey: {
                backgroundColor: '#00000017',
            },
            box: {
                padding: '15px 25px',
                color: '#fff',
                borderRadius: 5,
                boxSizing: 'border-box',
                height: '100%',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                    boxShadow: '0 0 25px -5px #9e9c9e',
                },
                [theme.breakpoints.down('lg')]: {
                    padding: '12px 16px',
                },
            },
            bgBlue: {
                background: 'linear-gradient(45deg, #4099ff, #73b4ff)',
            },
            bgGreen: {
                background: 'linear-gradient(45deg, #2ed8b6, #59e0c5)',
            },
            bgOrange: {
                background: 'linear-gradient(45deg, #FFB64D, #ffcb80)',
            },
            bgRed: {
                background: 'linear-gradient(45deg, #FF5370, #ff869a)',
            },
            bgGreenBlue: {
                background: 'linear-gradient(45deg, #2e65d8, #59e0c5)',
            },
            avatar: {
                borderRadius: '50%',
            },
        };
    }, [theme]);
}
