Create lambda
```
rm claudia.json
claudia create --region eu-central-1 --handler lambda.handler
```

Create an interval to execute the status check.
```
claudia add-scheduled-event --event event.json --name schedule-status --rate "1 minute"
```
