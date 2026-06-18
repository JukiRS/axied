# Bonsai House Wiki

Википедия ванилла++ сервера **Bonsai House** — механики, крафты, зачарования, генерация мира и правила.

🌐 **Сайт:** https://JukiRS.github.io/bonsaihouse/

## Как это устроено

Сайт собирается из Markdown-файлов в папке `docs/` с помощью [MkDocs](https://www.mkdocs.org/) и темы [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/). При каждом пуше в ветку `main` GitHub Actions автоматически собирает сайт и публикует его в ветку `gh-pages`.

## Как добавить или изменить статью

1. Создайте/отредактируйте `.md` файл в нужной подпапке `docs/` (например, `docs/crafting/моя-статья.md`).
2. Добавьте страницу в навигацию — в файле `mkdocs.yml` в разделе `nav:`.
3. Закоммитьте и запушьте в `main` — сайт обновится сам через пару минут.

## Локальный предпросмотр (необязательно)

```bash
pip install -r requirements.txt
mkdocs serve
```

Затем откройте http://127.0.0.1:8000
