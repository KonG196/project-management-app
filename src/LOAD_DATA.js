async function loadJSONData() {
  try {
    // Функція для читання JSON-файлів з папки `public/json`
    const fetchData = async (fileName) => {
      const response = await fetch(`${process.env.PUBLIC_URL}/json/${fileName}`);
      if (!response.ok) {
        throw new Error(`Не вдалося завантажити файл: ${fileName}`);
      }
      return response.json();
    };

    // Завантаження даних із JSON-файлів
    const users = await fetchData('users.json');
    const projects = await fetchData('projects.json');
    const tasks = await fetchData('tasks.json');
    const messages = await fetchData('messages.json');

    const appState = {
      projects,
      tasks,
    };

    // Збереження даних у локальній пам'яті
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('appState', JSON.stringify(appState));

    localStorage.setItem('teamChat', JSON.stringify(messages));

    console.log('Дані успішно завантажено в локальну пам\'ять!');
    alert('Дані успішно завантажено!');
  } catch (error) {
    console.error('Помилка завантаження даних:', error);
    alert('Помилка завантаження даних!');
  }
}

export default loadJSONData;
