
export const getRandomColor = () => {
    const colors = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark'];
    return colors[Math.floor(Math.random() * colors.length)];
  };
  