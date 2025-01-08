const setUserReaction = async (newsItemId: number, userId: number, reaction: string) => {
  const url = `/newsitems/${newsItemId}/set_user_reaction/`;
  const data = {
    user: userId,
    reaction: reaction
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${yourAuthToken}`, // If you're using token authentication
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to set user reaction');
    }

    const result = await response.json();
    console.log('Reaction set successfully:', result);
  } catch (error) {
    console.error('Error setting user reaction:', error);
  }
};

// Example usage
setUserReaction(1, 42, 'like'); // Assuming news item ID is 1 and user ID is 42
